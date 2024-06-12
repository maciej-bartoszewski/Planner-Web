import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaInfo } from "react-icons/fa6";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import { db, collection, getDocs, doc, updateDoc, deleteDoc } from "../firebase";

import Swal from "sweetalert2";

function Locals() {
  const navigate = useNavigate();
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    const fetchLocals = async () => {
      const localsCollection = collection(db, "restaurants");
      const localsSnapshot = await getDocs(localsCollection);
      const localsList = localsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLocals(localsList.filter((local) => !local.IsAccepted));
    };

    fetchLocals();
  }, []);

  const acceptLocal = async (id) => {
    try {
      const localDoc = doc(db, "restaurants", id);
      await updateDoc(localDoc, { IsAccepted: true });
      setLocals(locals.filter((local) => local.id !== id));
      Swal.fire({
        icon: "info",
        title: "Zaakceptowano punkt",
        color: "#2BA1F0",
        confirmButtonColor: "#2BDFF0",
        timer: 3000,
      });
    } catch (error) {
      console.error("Błąd podczas akceptacji lokalu: ", error);
    }
  };

  const rejectLocal = async (id) => {
    const result = await Swal.fire({
      title: "Czy chcesz odrzucić lokal?",
      showCancelButton: true,
      confirmButtonText: "Odrzuć",
      cancelButtonText: `Anuluj`,
      color: "#2BA1F0",
      confirmButtonColor: "#2BDFF0",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "restaurants", id));
        setLocals(locals.filter((local) => local.id !== id));
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
          text: "Nie udało się odrzucić lokal",
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
        <div className="bg-lightblue w-full rounded-t-3xl p-3 lg:text-2xl text-l">
          Nowe zgłoszenia dotyczące punktów gastronomicznych
        </div>
        <div className="overflow-y-auto lg:max-h-[87%] max-h-[85%]">
          <table className="w-full mt-2 lg:text-xl text-md border-separate border-spacing-y-1">
            <thead className="bg-lightblue text-left">
              <tr>
                <th className="p-3 lg:w-[55%]">Nazwa punktu gastronomicznego</th>
                <th className="pl-5">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {locals.map((local, index) => (
                <tr key={index} className="bg-lightblue bg-opacity-50">
                  <td className="p-5">{local.Name}</td>
                  <td className="lg:flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/punkty-gastronomiczne-info/${local.id}`)}
                      className="flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3"
                    >
                      <div className="w-5 mb-1 mx-1">
                        <FaInfo />
                      </div>
                      Informacje
                    </button>
                    <button
                      onClick={() => acceptLocal(local.id)}
                      className="flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3"
                    >
                      <div className="w-5 mx-1">
                        <AiOutlineCheck />
                      </div>
                      Akceptuj
                    </button>
                    <button
                      onClick={() => rejectLocal(local.id)}
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

export default Locals;
