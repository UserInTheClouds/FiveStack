import { useState,useEffect } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'
import './App.css'
import zustandStore from './misc/zustand.utility.js'
import Login from './pages/loginPage.jsx'
import Signup from './pages/signupPage.jsx'
import Chat from './pages/ChatPage.jsx'
import Landing from './pages/LandingPage.jsx'

function App() {
  const [count, setCount] = useState(0);

  const { authUser, isCheckingAuth, checkAuth } = zustandStore();

  useEffect(() => {
    checkAuth(); // 👈 trigger auth check on mount
  }, []);

   if (isCheckingAuth) return <div className='bg-black w-screen h-screen text-white flex items-center justify-center text-4xl' >Loading...</div>;

  return (
    <Routes>
        <Route path='/' element={!authUser?<Landing/>:<Navigate to='/chat'/>} />
        <Route path='/chat' element={authUser?<Chat/>:<Navigate to='/'/>} />
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/chat'/>} />
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/chat'/>} />
    </Routes>
  )
}

export default App
