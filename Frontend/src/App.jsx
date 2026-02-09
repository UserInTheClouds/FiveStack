import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './views/Landing.jsx'
import Login from './views/Login.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}
export default App