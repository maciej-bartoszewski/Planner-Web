import { useEffect, useState } from 'react';

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const mockedEvents = [
    { id: 0, name: 'Akademickie Targi Pracy'},
    { id: 1, name: 'Dzien WEEIA'},
  ];

function ManageEvents() {
    const [events, setEvents] = useState(mockedEvents);

    useEffect ( () => {
        setEvents(mockedEvents)
    }, [])

    return (
        <div className="flex items-center justify-center h-screen font-bold">
            <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl ">
                <div className="bg-lightblue w-full rounded-t-3xl p-3 lg:text-2xl text-l">
                    Zarządzaj wydarzeniami
                </div>
                <div className="overflow-y-auto lg:max-h-[90%] max-h-[85%]">
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
                                <td className="p-5">{event.name}</td>
                                <td className="lg:flex items-center justify-between">
                                    <button className='flex my-2 items-center justify-center duration-500 hover:bg-lightblue rounded-md p-3'><div className='w-5 '> <FaEdit /> </div>Edytuj</button>
                                    <button className='flex my-2 items-center justify-center duration-500 hover:bg-lightblue rounded-md p-3'><div className='w-5 '> <MdDelete /> </div>Usuń</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageEvents
