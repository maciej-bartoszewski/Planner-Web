import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

function EditLocal() {
  const navigate = useNavigate();
  const { localID } = useParams();

  const [Name, setName] = useState("");
  const [Location, setLocation] = useState("");
  const [MapLink, setMapLink] = useState("");
  const [ImageLink, setImageLink] = useState("");

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const db = getFirestore();
        const localRef = doc(db, "restaurants", localID);
        const localDoc = await getDoc(localRef);
        if (localDoc.exists()) {
          const localData = localDoc.data();
          setName(localData.Name);
          setLocation(localData.Location);
          setMapLink(localData.MapLink);
          setImageLink(localData.ImageLink);
        } else {
          console.log("Nie znaleziono danych dla punktu gastronomicznego o ID:", localID);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych punktu gastronomicznego:", error);
      }
    };

    fetchLocalData();
  }, [localID]);

  const handleSave = async () => {
    if (!Name || !Location || !MapLink || !ImageLink) {
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
        const db = getFirestore();
        const localRef = doc(db, "restaurants", localID);
        await updateDoc(localRef, {
          Name: Name,
          Location: Location,
          ImageLink: ImageLink,
          MapLink: MapLink,
        });
        Swal.fire({
          title: "Zapisano!",
          icon: "info",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 3000,
        });
        navigate("/zarzadzaj-punktami-gastronomicznymi");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się zaktualizować punktu",
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
        const db = getFirestore();
        const localRef = doc(db, "restaurants", localID);
        await updateDoc(localRef, {
          Name: Name,
          Location: Location,
          ImageLink: ImageLink,
          MapLink: MapLink,
        });
        Swal.fire({
          title: "Zapisano!",
          icon: "info",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 2000,
        });
        navigate("/zarzadzaj-punktami-gastronomicznymi");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się zaktualizować punktu",
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
      navigate("/zarzadzaj-punktami-gastronomicznymi");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-bold">
      <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
        <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
          <span className="p-3">Edytuj punkt gastronomiczny</span>
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
        <div className="flex flex-col items-center overflow-y-auto max-h-[85%]">
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Nazwa lokalu</p>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></input>
          </div>
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Adres lokalu</p>
            <input
              type="text"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></input>
          </div>
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Link do zdjęcia</p>
            <input
              type="text"
              value={ImageLink}
              onChange={(e) => setImageLink(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></input>
          </div>
          <div className="w-1/2 md:w-1/3 bg-[#FFFFFF] my-3">
            <img className="mx-auto my-auto py-3 w-[50%]" src={ImageLink} alt="zdjecie lokalu"></img>
          </div>
          <div className="md:w-1/3">
            <p className="pt-5 font-semibold">Link do mapy</p>
            <input
              type="text"
              value={MapLink}
              onChange={(e) => setMapLink(e.target.value)}
              className="px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLocal;
