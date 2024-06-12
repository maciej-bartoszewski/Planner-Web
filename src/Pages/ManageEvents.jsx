import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

function ManageEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const acceptedEvents = eventsList.filter((event) => event.IsAccepted === true);
      setEvents(acceptedEvents);
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    const result = await Swal.fire({
      title: "Czy chcesz usunąć wydarzenie?",
      showCancelButton: true,
      confirmButtonText: "Usuń",
      cancelButtonText: `Anuluj`,
      color: "#2BA1F0",
      confirmButtonColor: "#2BDFF0",
    });

    if (result.isConfirmed) {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "events", id));
        setEvents(events.filter((event) => event.id !== id));
        Swal.fire({
          title: "Usunięto wydarzenie!",
          icon: "info",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 3000,
        });
      } catch (error) {
        console.error("Błąd podczas odrzucania wydarzenia: ", error);
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się zaktualizować wydarzenia",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 3000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-bold">
      <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
        <div className="bg-lightblue w-full rounded-t-3xl p-3 lg:text-2xl text-l">Zarządzaj wydarzeniami</div>
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
                      onClick={() => navigate(`/edytuj-wydarzenie/${event.id}`)}
                      className="flex my-2 items-center justify-center duration-500 hover:bg-lightblue rounded-md p-3"
                    >
                      <div className="w-5 mx-1">
                        <FaEdit />
                      </div>
                      Edytuj
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="flex my-2 items-center justify-center duration-500 hover:bg-lightblue rounded-md p-3"
                    >
                      <div className="w-5 mx-1">
                        <MdDelete />
                      </div>
                      Usuń
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

export default ManageEvents;
