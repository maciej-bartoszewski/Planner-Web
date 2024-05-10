import { useEffect, useState } from 'react';

import { MdDelete } from "react-icons/md";

const mockedUsers = [
    { id: 0, imie: 'Ian', nazwisko: 'Chesnut', email: 'IanChesnut@mail.com'},
    { id: 1, imie: 'Erin', nazwisko: 'Walter', email: 'ErinWalter@mail.com'},
    { id: 2, imie: 'Zeki', nazwisko: 'Marika', email: 'ZekiMarika@mail.com'},
  ];

function ManageUsers() {
    const [users, setUsers] = useState(mockedUsers);

    useEffect ( () => {
        setUsers(mockedUsers)
    }, [])

    return (
        <div className="flex items-center justify-center h-screen font-bold">
            <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl ">
                <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
                    <span className='p-3'>Wszyscy użytkownicy</span>
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
                                <td className="p-5">{user.imie}</td>
                                <td className="p-5">{user.nazwisko}</td>
                                <td className="p-5">{user.email}</td>
                                <td><button className='flex items-center justify-center duration-500 hover:bg-lightblue rounded-md my-2 p-3'><div className='w-5 '> <MdDelete /> </div>Usuń</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers
