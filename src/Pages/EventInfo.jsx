import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

function EventInfo() {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const db = getFirestore();
        const eventRef = doc(db, "events", eventID);
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists()) {
          setEventData(eventDoc.data());
        } else {
          console.log("Nie znaleziono danych dla wydarzenia o ID:", eventID);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych wydarzenia:", error);
      }
    };

    fetchEventData();
  }, [eventID]);

  return (
    <div className="flex items-center justify-center h-screen font-bold">
      <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
        <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
          <span className="p-3">Informacja o wydarzeniu</span>
          <button
            onClick={() => navigate("/wydarzenia")}
            className="flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3"
          >
            <div className="w-5">
              <IoIosArrowBack />
            </div>
            Wróć
          </button>
        </div>
        <div className="flex flex-col items-center overflow-y-auto max-h-[85%] lg:text-2xl text-l mt-6">
          {eventData && (
            <>
              <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                <span>Nazwa wydarzenia: </span>
                <span className="text-right">{eventData.Name} </span>
              </div>
              <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                <span>Miejsce wydarzenia: </span>
                <span className="text-right">{eventData.Location} </span>
              </div>
              <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                <span>Data wydarzenia: </span>
                <span className="text-right">{eventData.Date} </span>
              </div>
              <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                <span>Opis: </span>
                <span className="w-[80%] text-justify">{eventData.Description} </span>
              </div>
              <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                <span>Link do mapy: </span>
                <span className="text-right">
                  <a href={eventData.MapLink} target="_blank">
                    Naciśnij aby sprawdzić
                  </a>
                </span>
              </div>
              <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-[#FFFFFF] my-2 p-3">
                <img className="mx-auto" src={eventData.ImageLink} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventInfo;
