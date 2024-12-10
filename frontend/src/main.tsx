import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './pages/Register.tsx'
import { Login } from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}>
            <Route path="cadastro" element = {<Register/>} />
            <Route path="login" element = {<Login/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
