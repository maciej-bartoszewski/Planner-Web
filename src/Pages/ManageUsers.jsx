// src/Pages/ManageUsers.jsx
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { db, collection, getDocs, doc, deleteDoc } from "../firebase";
import Swal from "sweetalert2";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "login");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Czy chcesz usunąć użytkownika?",
      showCancelButton: true,
      confirmButtonText: "Usuń",
      cancelButtonText: `Anuluj`,
      color: "#2BA1F0",
      confirmButtonColor: "#2BDFF0",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "login", id));
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire({
          title: "Usunięto użytkownika!",
          icon: "info",
          color: "#2BA1F0",
          confirmButtonColor: "#2BDFF0",
          timer: 3000,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się usunąć użytkownika",
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
        <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
          <span className="p-3">Wszyscy użytkownicy</span>
        </div>
        <div className="overflow-y-auto lg:max-h-[90%] max-h-[85%]">
          <table className="w-full mt-2 lg:text-xl text-md border-separate border-spacing-y-1">
            <thead className="bg-lightblue text-left">
              <tr>
                <th className="p-3">Imię</th>
                <th className="p-3">Nazwisko</th>
                <th className="pl-5">E-mail</th>
                <th className="pl-5">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="bg-lightblue bg-opacity-50">
                  <td className="p-5">{user.Name}</td>
                  <td className="p-5">{user.LastName}</td>
                  <td className="p-5">{user.Email}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="flex items-center justify-center duration-500 hover:bg-lightblue rounded-md my-2 p-3"
                    >
                      <div className="w-5 ">
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

export default ManageUsers;
