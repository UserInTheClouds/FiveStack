import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Analytics from './pages/components/Analytics';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Analytics />
    <App />
  </BrowserRouter>
)
