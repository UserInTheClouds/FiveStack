import { useState,useEffect } from 'react'
import {Navigate, Route,Routes} from 'react-router-dom'
import './App.css'
import zustandStore from './misc/zustand.utility.js'
import Login from './pages/loginPage.jsx'
import Signup from './pages/signupPage.jsx'
import Home from './pages/HomePage.jsx'

function App() {
  const [count, setCount] = useState(0);

  const { authUser, isCheckingAuth, checkAuth } = zustandStore();

  useEffect(() => {
    checkAuth(); // 👈 trigger auth check on mount
  }, []);

   if (isCheckingAuth) return <div className='bg-black w-screen h-screen text-white flex items-center justify-center text-4xl' >Loading...</div>;

  return (
    <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>} />
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>} />
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/'/>} />
    </Routes>
  )
}

export default App
