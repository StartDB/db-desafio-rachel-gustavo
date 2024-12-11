import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './pages/Register.tsx'
import { Login } from './pages/Login.tsx'
import { Dashboard} from './pages/Dashboard.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <UserProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                <Route path="cadastro" element = {<Register/>} />
                <Route path="login" element = {<Login/>} />
                <Route path="dashboard/:id" element={<Dashboard />}>
                </Route>
              </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      
  </StrictMode>,
)
