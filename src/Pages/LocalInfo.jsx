import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function LocalInfo() {
  const { localID } = useParams();
  const navigate = useNavigate();
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const db = getFirestore();
        const localRef = doc(db, "restaurants", localID);
        const localDoc = await getDoc(localRef);
        if (localDoc.exists()) {
          setLocalData(localDoc.data());
        } else {
          console.log("Nie znaleziono danych dla lokalu o ID:", localID);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych lokalu:", error);
      }
    };

    fetchLocalData();
  }, [localID]);

  return (
    <div className="flex items-center justify-center h-screen font-bold">
      <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
        <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
          <span className="p-3">Informacja o punkcie gastronomicznym</span>
          <button
            onClick={() => navigate("/punkty-gastronomiczne")}
            className="flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3"
          >
            <div className="w-5">
              <IoIosArrowBack />
            </div>
            Wróć
          </button>
        </div>
        {localData ? (
          <div className="flex flex-col items-center overflow-y-auto max-h-[85%] lg:text-2xl text-l mt-10">
            <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
              <span>Nazwa lokalu: </span>
              <span>{localData.Name}</span>
            </div>
            <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
              <span>Adres lokalu: </span>
              <span>{localData.Location}</span>
            </div>
            <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
              <span>Link do mapy: </span>
              <span>
                <a href={eventData.MapLink}> Naciśnij aby sprawdzić </a>
              </span>
            </div>
            <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-[#FFFFFF] my-2 p-3">
              <img className="mx-auto" src={localData.ImageLink} alt="Zdjęcie lokalu" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span>Ładowanie danych...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocalInfo;
