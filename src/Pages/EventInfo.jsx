import { useNavigate } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

const mockedEvent = {
    name: 'Dzień WEEIA',
    place: 'WEEIA',
    date: '24 marca 2024',
    description: 'Jest to wydarzenie, które umożliwia Wam zdobycie nowych umiejętności i zaznajomienie się z różnymi ofertami pracy i praktyk.',
    map: 'link.do.mapy.pl',
    img: 'https://mlodziwlodzi.pl/wp-content/uploads/420125575_877561351038343_6256364071254790138_n-1200x628.jpg'
}

function EventInfo() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen font-bold">
            <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
                <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
                    <span className='p-3'>Informacja o wydarzeniu</span>
                    <button onClick={() => navigate("/wydarzenia")} className='flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3'><div className='w-5'><IoIosArrowBack /></div>Wróć</button>
                </div>
                <div className="flex flex-col items-center overflow-y-auto max-h-[85%] lg:text-2xl text-l mt-6">
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                        <spam>Nazwa wydarzenia: </spam>
                        <spam>{mockedEvent.name} </spam>
                    </div>
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                        <spam>Miejsce wydarzenia: </spam>
                        <spam>{mockedEvent.place} </spam>
                    </div>
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                        <spam>Data wydarzenia: </spam>
                        <spam>{mockedEvent.date} </spam>
                    </div>
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                        <spam>Opis: </spam>
                        <spam className='w-[80%]'>{mockedEvent.description} </spam>
                    </div>
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                        <spam>Link do mapy: </spam>
                        <spam>{mockedEvent.map} </spam>
                    </div>
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-[#FFFFFF] my-2 p-3">
                        <img className="" src={mockedEvent.img}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventInfo;
