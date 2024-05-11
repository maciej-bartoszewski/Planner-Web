import { IoIosArrowBack } from "react-icons/io";

const mockedLocal = {name: 'Index', address: 'ul. JakasTam 21/37', img: 'https://indeksklub.pl/gallery/gallery2.JPG'}

function LocalInfo() {
    return (
        <div className="flex items-center justify-center h-screen font-bold">
            <div className="mt-10 bg-blue w-[95%] h-5/6 rounded-3xl">
                <div className="bg-lightblue w-full rounded-t-3xl lg:text-2xl text-l flex justify-between items-center">
                    <span className='p-3'>Informacja o punkcie gastronomicznym</span>
                    <button className='flex items-center justify-center mx-3 duration-500 bg-blue hover:bg-opacity-50 rounded-md my-2 py-1 px-3'><div className='w-5 '> <IoIosArrowBack /> </div>Wróć</button>
                </div>
                <div className="flex flex-col items-center overflow-y-auto max-h-[85%] lg:text-2xl text-l mt-10">
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                        <spam>Nazwa lokalu: </spam>
                        <spam>{mockedLocal.name} </spam>
                    </div>
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-lightblue bg-opacity-50 my-2 p-3">
                        <spam>Adres lokalu: </spam>
                        <spam>{mockedLocal.address} </spam>
                    </div>
                    <div className="flex items-center justify-between lg:w-[40%] md:w-[55%] w-[70%] bg-[#FFFFFF] my-2 p-3">
                        <img className="" src={mockedLocal.img}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocalInfo;