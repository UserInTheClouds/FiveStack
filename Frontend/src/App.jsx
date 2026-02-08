import { useState } from 'react'
import './App.css'
import ButtonComp from './components/ButtonComp.jsx'
import Logo from './components/Logo.jsx'
import NavItem from './components/NavItem.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen min-w-full bg-gradient-to-tl from-sky-950 to-black relative'>

      <header className='flex  bg-black relative pt-5'>
          <Logo color='bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent' size='text-2xl' misc='ml-5'/>
          <div className='flex items-end absolute right-24 gap-12 bottom-0.5'>
          <NavItem text='Home'/>
          <NavItem text='FAQ'/>
          <NavItem text='Contact'/>
          <ButtonComp btn_text='Log In' btn_color='bg-gray-50' btn_hover='hover:bg-gray-300' padding='px-5'/>
          </div>
      </header>

      <div className='text-gray-300 mt-30 ml-25'>
        <p className='text-5xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent'>Connect with friends <br /> Collaborate as teams</p>
        <p className='text-2xl font-medium mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Quasi doloribus nemo amet molestias provident quo <br /> eveniet, corporis voluptatum sit ex mollitia laudantium <br /> modi magnam, iusto reiciendis, quos voluptates et. Qui!</p>
        <p className='text-2xl font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Quasi doloribus nemo amet molestias provident quo <br /> eveniet, corporis voluptatum sit ex mollitia laudantium <br /> modi magnam, iusto reiciendis, quos voluptates et. Qui!</p>
      </div>
      <ButtonComp btn_text='Get Started' btn_color='bg-gradient-to-r from-pink-500 to-amber-500' misc='ml-25 mt-5 px-5 py-2 text-gray-800' btn_hover='hover:from-fuschia-300 hover:to-yellow-500 hover:shadow-amber-500 hover:shadow-[1px_1px_10px_rgba(0,0,0,0.2)] '/>
    </div>
  )
}
export default App
