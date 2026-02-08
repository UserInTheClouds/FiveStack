import { useState } from 'react'
import ButtonComp from '../components/ButtonComp.jsx'
import Logo from '../components/Logo.jsx'
import NavItem from '../components/NavItem.jsx'

const Landing = function () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='min-h-screen min-w-full bg-gradient-to-tl from-sky-950 to-black relative '>


      <header className='flex justify-between items-center bg-black relative pt-5 md:mr-15 mr-5'>
          <Logo color='bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent' size='text-2xl' misc='ml-5'/>
          <div className='md:flex hidden items-center gap-12'>
          <NavItem text='Home'/>
          <NavItem text='FAQ'/>
          <NavItem text='Contact'/>
          <ButtonComp btn_text='Log In' btn_color='bg-gray-50' btn_hover='hover:bg-gray-300' padding='px-5'/>
          </div>
          <button onClick={()=>setIsOpen(!isOpen)} className='md:hidden cursor-grab z-65'>
            {!isOpen && (<img className='bg-white h-5' src="https://img.icons8.com/?size=100&id=8113&format=png&color=000000" alt="" />)}
            {isOpen && (<img className='bg-white h-5' src="https://img.icons8.com/?size=100&id=kFzAAATwOEKo&format=png&color=000000" alt="" />)}
          </button>
      </header>
      {
        <div className={`flex fixed w-screen bg-black md:hidden flex-col gap-y-5 top-0 pt-15 md:mt-7 items-center transition-all duration-200 ${isOpen ? "opacity-100 translate-y-0" : "-translate-y-10 opacity-0 h-0"}`}>
          <NavItem text='Home'/>
          <NavItem text='FAQ'/>
          <NavItem text='Contact'/>
          <ButtonComp btn_text='Log In' btn_color='bg-gray-50' btn_hover='hover:bg-gray-300' padding='px-5'/>
        </div>
      }
      
      <div className='text-gray-300 md:mt-30 md:ml-25 m-5 '>
        <p className='text-5xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent'>Connect with friends</p>
        <p className='text-5xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent'>Collaborate as teams</p>
        <p className='text-2xl font-medium mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Quasi doloribus nemo amet molestias provident quo <br /> eveniet, corporis voluptatum sit ex mollitia laudantium <br /> modi magnam, iusto reiciendis, quos voluptates et. Qui!</p>
        <p className='text-2xl font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Quasi doloribus nemo amet molestias provident quo <br /> eveniet, corporis voluptatum sit ex mollitia laudantium <br /> modi magnam, iusto reiciendis, quos voluptates et. Qui!</p>
      </div>
      <ButtonComp btn_text='Get Started' btn_color='bg-gradient-to-r from-pink-500 to-amber-500' misc='md:ml-25 ml-5 px-5 py-2 text-gray-800' btn_hover='hover:from-fuschia-300 hover:to-yellow-500 hover:shadow-amber-500 hover:shadow-[1px_1px_10px_rgba(0,0,0,0.2)] '/>
    </div>
  )
}

export default Landing