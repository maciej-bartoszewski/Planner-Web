import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { parse, isValid } from "date-fns";
import Swal from "sweetalert2";

function EditEvent() {
  const navigate = useNavigate();
  const { eventID } = useParams();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [location, setLocation] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventRef = doc(db, "events", eventID);
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists()) {
          const eventData = eventDoc.data();
          setName(eventData.Name);
          setPlace(eventData.Location);
          setDate(eventData.Date);
          setDescription(eventData.Description);
          setPicture(eventData.ImageLink);
          setLocation(eventData.MapLink);
        } else {
          console.log("Nie znaleziono danych dla wydarzenia o ID:", eventID);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych wydarzenia:", error);
      }
    };

    fetchEventData();
  }, [eventID]);

  const handleSave = async () => {
    setError("");

    if (!name || !place || !date || !description || !picture || !location) {
      Swal.fire({
        icon: "error",
        title: "Błąd danych",
        html: "Wprowadz wszystkie dane",
        color: "#2BA1F0",
        confirmButtonColor: "#2BDFF0",
        timer: 3000,
      });
      return;
    }

    const parsedDate = parse(date, "dd.MM.yyyy HH:mm", new Date());
    if (!isValid(parsedDate)) {
      Swal.fire({
        icon: "error",
        title: "Błąd daty",
        html: "Wprowadz dane w formacie </br> 'dd-mm-yyyy hh:mm'",
        color: "#2BA1F0",
        confirmButtonColor: "#2BDFF0",
        timer: 5000,
      });
      return;
    }

    const result = await Swal.fire({
      title: "Czy chcesz zapisać zmiany?",
      showCancelButton: true,
      confirmButtonText: "Zapisz",
      cancelButtonText: `Anuluj`,
      color: "#2BA1F0",
      confirmButtonColor: "#2BDFF0",
    });

    if (result.isConfirmed) {
      try {
        const eventRef = doc(db, "events", eventID);
        await updateDoc(eventRef, {
          Name: name,
          Location: place,
          Date: date,
          Description: description,
          ImageLink: picture,
          MapLink: location,
        });
        Swal.fire({
          title: "Zapisano!",
          icon: "info",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 3000,
        });
        navigate("/zarzadzaj-wydarzeniami");
      } catch (error) {
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

  const handleBack = async () => {
    const result = await Swal.fire({
      title: "Czy chcesz zapisać zmiany?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Zapisz",
      denyButtonText: `Nie zapisuj`,
      cancelButtonText: `Anuluj`,
      color: "#2BA1F0",
      confirmButtonColor: "#2BDFF0",
    });

    if (result.isConfirmed) {
      try {
        const eventRef = doc(db, "events", eventID);
        await updateDoc(eventRef, {
          Name: name,
          Location: place,
          Date: date,
          Description: description,
          ImageLink: picture,
          MapLink: location,
        });
        Swal.fire({
          title: "Zapisano!",
          icon: "info",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 2000,
        });
        navigate("/zarzadzaj-wydarzeniami");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się zaktualizować wydarzenia",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 2000,
        });
      }
    } else if (result.isDenied) {
      Swal.fire({
        title: "Zmiany nie zostały zapisane",
        icon: "info",
        color: "#2BA1F0",
        confirmButtonColor: "#2BDFF0",
        timer: 2000,
      });
      navigate("/zarzadzaj-wydarzeniami");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-bold">
      <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
        <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
          <span className="p-3">Edytuj wydarzenie</span>
          <div className="flex justify-center items-center flex-col sm:flex-row">
            <button
              onClick={handleSave}
              className="flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3"
            >
              <div className="w-5 mr-2">
                {" "}
                <AiOutlineCheck />{" "}
              </div>
              Zapisz
            </button>
            <button
              onClick={handleBack}
              className="flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3"
            >
              <div className="w-5 mx-1">
                {" "}
                <IoIosArrowBack />{" "}
              </div>
              Wróć
            </button>
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex flex-col items-center overflow-y-auto max-h-[85%]">
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Nazwa wydarzenia</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></input>
          </div>
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Miejsce wydarzenia</p>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></input>
          </div>
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Data wydarzenia</p>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
              placeholder="yyyy-MM-dd HH:mm"
            ></input>
          </div>
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Opis wydarzenia</p>
            <textarea
              rows={4}
              cols={40}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></textarea>
          </div>
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Link do zdjęcia</p>
            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></input>
          </div>
          <div className="w-1/2 md:w-1/3 bg-[#FFFFFF] my-3">
            <img className="mx-auto my-auto py-3 w-[50%]" src={picture} alt="zdjecie lokalu"></img>
          </div>
          <div className="md:w-1/3">
            <p className="font-semibold">Link do mapy</p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
