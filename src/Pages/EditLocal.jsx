import { useState } from 'react';

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";

function EditLocal() {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [picture, setPicture] = useState();
    const [location, setLocation] = useState();

    return (
        <div className="flex items-center justify-center h-screen font-bold">
            <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
                <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
                    <span className='p-3'>Edytuj punkt gastronomiczny</span>
                    <div className="flex justify-center items-center">
                        <button className='flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3'><div className='w-5 '> <AiOutlineCheck /> </div>Zapisz</button>
                        <button className='flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3'><div className='w-5 '> <IoIosArrowBack /> </div>Wróć</button>
                    </div>
                </div>
                <div className="flex flex-col items-center overflow-y-auto max-h-[85%]">
                    <div className='md:w-1/3'>
                        <p className='pt-5 font-semibold'>Nazwa lokalu</p>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='pt-5 font-semibold'>Adres lokalu</p>
                        <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='pt-5 font-semibold'>Link do zdjęcia</p>
                        <input type='text' value={picture} onChange={(e) => setPicture(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='pt-5 font-semibold'>Link do mapy</p>
                        <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLocal
