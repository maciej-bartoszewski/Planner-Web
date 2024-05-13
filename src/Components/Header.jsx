import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

const Header = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
      setNav(!nav);
    };

    return (
        <div className='absolute top-0 left-0 w-full bg-blue h-16 flex items-center justify-between px-3 z-10'>
            <img src={logo} className='h-full'/>
            <ul className='hidden lg:flex items-center text-md font-bold h-full'>
                <li className='hover:bg-lightblue h-full px-3 duration-500 flex items-center justify-center text-center'><Link to="/wydarzenia" className='h-full flex items-center justify-center'>Wydarzenia</Link></li>
                <li className='hover:bg-lightblue h-full px-3 duration-500 flex items-center justify-center text-center'><Link to="/zarzadzaj-wydarzeniami" className='h-full flex items-center justify-center'>Zarządzaj wydarzeniami</Link></li>
                <li className='hover:bg-lightblue h-full px-3 duration-500 flex items-center justify-center text-center'><Link to="/punkty-gastronomiczne" className='h-full flex items-center justify-center'>Punkty gastronimiczne</Link></li>
                <li className='hover:bg-lightblue h-full px-3 duration-500 flex items-center justify-center text-center'><Link to="/zarzadzaj-punktami-gastronomicznymi" className='h-full flex items-center justify-center'>Zarządzj punktami gastronomicznymi</Link></li>
                <li className='hover:bg-lightblue h-full px-3 duration-500 flex items-center justify-center text-center'><Link to="/zarzadzaj-uzytkownikami" className='h-full flex items-center justify-center'>Zarządzaj użytkownikami</Link></li>
            </ul>
            <button className='hidden lg:flex text-xl font-bold hover:bg-lightblue h-full px-3 duration-500 items-center text-center' >Wyloguj się</button>
                <div onClick={handleNav} className='block lg:hidden'>
                    {!nav && <div className='w-5 '> <IoIosMenu /> </div>}
                </div>
                <ul className={`flex flex-col justify-center items-center ${nav ? 'fixed left-0 top-0 w-full border-r border-r-gray-900 bg-blue transform translate-y-0 transition-transform ease-in-out duration-500' : 'left-0 top-0 bg-blue w-full transform -translate-y-full transition-transform ease-in-out duration-500 fixed'}`}>
                    <div onClick={handleNav} className='block lg:hidden ml-auto p-3'>
                        {nav && <div className='w-5 '> <IoIosClose /> </div>}
                    </div>
                    <li className='hover:bg-lightblue px-3 py-4 duration-500 w-full text-center'><Link to="/wydarzenia">Wydarzenia</Link></li>
                    <li className='hover:bg-lightblue px-3 py-4 duration-500 w-full text-center'><Link to="/zarzadzaj-wydarzeniami">Zarządzaj wydarzeniami</Link></li>
                    <li className='hover:bg-lightblue px-3 py-4 duration-500 w-full text-center'><Link to="/punkty-gastronomiczne">Punkty gastronomiczne</Link></li>
                    <li className='hover:bg-lightblue px-3 py-4 duration-500 w-full text-center'><Link to="/zarzadzaj-punktami-gastronomicznymi">Zarządzj punktami gastronomicznymi</Link></li>
                    <li className='hover:bg-lightblue px-3 py-4 duration-500 w-full text-center'><Link to="/zarzadzaj-uzytkownikami">Zarządzaj użytkownikami</Link></li>
                    <li className='hover:bg-lightblue px-3 py-4 duration-500 w-full text-center'>Wyloguj się</li>
                </ul>
        </div>
    )
  }
  
  export default Header
  