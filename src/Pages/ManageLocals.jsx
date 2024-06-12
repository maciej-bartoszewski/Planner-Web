import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

function ManageLocals() {
  const navigate = useNavigate();
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    const fetchLocals = async () => {
      const db = getFirestore();
      const localsCollection = collection(db, "restaurants");
      const localsSnapshot = await getDocs(localsCollection);
      const localsList = localsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const acceptedLocals = localsList.filter((local) => local.IsAccepted === true);
      setLocals(acceptedLocals);
    };

    fetchLocals();
  }, []);

  const deleteLocal = async (id) => {
    const result = await Swal.fire({
      title: "Czy chcesz usunąć punkt?",
      showCancelButton: true,
      confirmButtonText: "Usuń",
      cancelButtonText: `Anuluj`,
      color: "#2BA1F0",
      confirmButtonColor: "#2BDFF0",
    });

    if (result.isConfirmed) {
      try {
        const db = getFirestore();
        await deleteDoc(doc(db, "restaurants", id));
        setLocals(locals.filter((local) => local.id !== id));
        Swal.fire({
          title: "Usunięto punkt!",
          icon: "info",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 3000,
        });
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

  return (
    <div className="flex items-center justify-center h-screen font-bold">
      <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl ">
        <div className="bg-lightblue w-full rounded-t-3xl p-3 lg:text-2xl text-l">
          Zarządzaj punktami gastronomicznymi
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
                      onClick={() => navigate(`/edytuj-punkt-gastronomiczny/${local.id}`)}
                      className="flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3"
                    >
                      <div className="w-5 mx-1">
                        {" "}
                        <FaEdit />{" "}
                      </div>
                      Edytuj
                    </button>
                    <button
                      onClick={() => deleteLocal(local.id)}
                      className="flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3"
                    >
                      <div className="w-5 mx-1">
                        {" "}
                        <MdDelete />{" "}
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

export default ManageLocals;
