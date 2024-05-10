import { useState } from 'react';

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";

function EditEvent() {
    const [name, setName] = useState();
    const [place, setPlace] = useState();
    const [date, setDate] = useState();
    const [description, setDescription] = useState();
    const [picture, setPicture] = useState();
    const [location, setLocation] = useState();

    return (
        <div className="flex items-center justify-center h-screen font-bold">
            <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
                <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
                    <span className='p-3'>Edytuj wydarzenie</span>
                    <div className="flex justify-center items-center">
                        <button className='flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3'><div className='w-5 '> <AiOutlineCheck /> </div>Zapisz</button>
                        <button className='flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3'><div className='w-5 '> <IoIosArrowBack /> </div>Wróć</button>
                    </div>
                </div>
                <div className="flex flex-col items-center overflow-y-auto max-h-[85%]">
                    <div className='md:w-1/3'>
                        <p className='pt-5 font-semibold'>Nazwa wydarzenia</p>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='pt-5 font-semibold'>Miejsce wydarzenia</p>
                        <input type='text' value={place} onChange={(e) => setPlace(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='pt-5 font-semibold'>Data wydarzenia</p>
                        <input type='text' value={date} onChange={(e) => setDate(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='pt-5 font-semibold'>Opis wydarzenia</p>
                        <textarea rows={4} cols={40} value={description} onChange={(e) => setDescription(e.target.value)} className='resize-none px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></textarea>
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

export default EditEvent
