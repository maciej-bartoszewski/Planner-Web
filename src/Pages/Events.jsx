import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { FaInfo } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import { db, collection, getDocs, doc, deleteDoc, updateDoc } from "../firebase";

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsList.filter((event) => !event.IsAccepted));
    };

    fetchEvents();
  }, []);

  const acceptEvent = async (id) => {
    try {
      const eventDoc = doc(db, "events", id);
      await updateDoc(eventDoc, { IsAccepted: true });
      setEvents(events.filter((event) => event.id !== id));
      Swal.fire({
        icon: "info",
        title: "Zaakceptowano zgłoszenie",
        color: "#2BA1F0",
        confirmButtonColor: "#2BDFF0",
        timer: 3000,
      });
    } catch (error) {
      console.error("Błąd podczas akceptacji wydarzenia: ", error);
    }
  };

  const rejectEvent = async (id) => {
    const result = await Swal.fire({
      title: "Czy chcesz odrzucić zgłoszenie?",
      showCancelButton: true,
      confirmButtonText: "Odrzuć",
      cancelButtonText: `Anuluj`,
      color: "#2BA1F0",
      confirmButtonColor: "#2BDFF0",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "events", id));
        setEvents(events.filter((event) => event.id !== id));
        Swal.fire({
          title: "Odrzucono zgłoszenie!",
          icon: "info",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 3000,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się odrzucić wydarzenia",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 3000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-bold">
      <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl ">
        <div className="bg-lightblue w-full rounded-t-3xl p-3 lg:text-2xl text-l">
          Nowe zgłoszenia dotyczące wydarzeń
        </div>
        <div className="overflow-y-auto lg:max-h-[87%] max-h-[85%]">
          <table className="w-full mt-2 lg:text-xl text-md border-separate border-spacing-y-1">
            <thead className="bg-lightblue text-left">
              <tr>
                <th className="p-3 lg:w-[55%]">Nazwa wydarzenia</th>
                <th className="pl-5">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="bg-lightblue bg-opacity-50">
                  <td className="p-5">{event.Name}</td>
                  <td className="lg:flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/wydarzenia-info/${event.id}`)}
                      className="flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3"
                    >
                      <div className="w-5 mb-1 mx-1">
                        <FaInfo />
                      </div>
                      Informacje
                    </button>
                    <button
                      onClick={() => acceptEvent(event.id)}
                      className="flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3"
                    >
                      <div className="w-5 mx-1">
                        <AiOutlineCheck />
                      </div>
                      Akceptuj
                    </button>
                    <button
                      onClick={() => rejectEvent(event.id)}
                      className="flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3"
                    >
                      <div className="w-5 mx-1">
                        <AiOutlineClose />
                      </div>
                      Odrzuć
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Events;
