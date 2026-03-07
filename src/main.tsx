import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <App />
    </Router>
  </StrictMode>,
)
