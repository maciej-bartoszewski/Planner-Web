import { useState } from 'react';

import logo from '../assets/logo.png';

function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
      <div className="flex items-center justify-center h-screen">
        <div className="mt-10 bg-blue md:w-[55%] h-5/6 md:rounded-none md:rounded-l-3xl rounded-3xl p-10">
            <h1 className='font-black text-3xl'>
                ZALOGUJ SIĘ
            </h1>
            <h2 className='mt-2 text-xl'>
                Zaloguj się aby w pełni korzystać z aplkacji.
            </h2>
            <div className='flex flex-col items-center justify-center h-3/4'>
                <div className='md:w-2/3'>
                    <p className='md:mt-10 font-semibold'>E-mail</p>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                </div>
                <div className='md:w-2/3'>
                    <p className='pt-5 font-semibold'>Hasło</p>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='px-3 py-1 w-full rounded-xl text-xl bg-blue border-white border-4 hover:border-lightblue duration-500'></input>
                </div>
                <button className='mt-10 bg-lightblue font-black text-xl border-8 border-lightblue rounded-lg py-2 px-8 hover:px-12 md:px-20 md:hover:px-24 duration-500'>
                    Zaloguj się
                </button>
            </div>
        </div>
        <div className="mt-10 bg-lightblue w-[40%] h-5/6 rounded-r-3xl items-center justify-center hidden md:flex">
            <img src={logo} className='w-full'/>
        </div>
      </div>
    )
  }
  
  export default LoginPage
  