import { useEffect, useState } from 'react';

import { FaInfo } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

const mockedLocals = [
    { id: 0, name: 'Index'},
    { id: 1, name: 'Finestra'},
    { id: 2, name: 'Bar Agh Hnung'},
    { id: 3, name: 'Forno Nero'},
    { id: 4, name: 'Alora'},
  ];

function Locals() {
    const [locals, setLocals] = useState(mockedLocals);

    useEffect ( () => {
        setLocals(mockedLocals)
    }, [])

    return (
        <div className="flex items-center justify-center h-screen font-bold">
            <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl ">
                <div className="bg-lightblue w-full rounded-t-3xl p-3 lg:text-2xl text-l">
                    Nowe zgłoszenia dotyczące punktów gastronomicznych
                </div>
                <div className="overflow-y-auto lg:max-h-[90%] max-h-[85%]">
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
                                <td className="p-5">{local.name}</td>
                                <td className="lg:flex items-center justify-between">
                                    <button className='flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3'><div className='w-5 '> <FaInfo /> </div>Informacje</button>
                                    <button className='flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3'><div className='w-5 '> <AiOutlineCheck /> </div>Akceptuj</button>
                                    <button className='flex items-center duration-500 hover:bg-lightblue rounded-md my-2 p-3'><div className='w-5 '> <AiOutlineClose /> </div>Odrzuć</button>
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

export default Locals
