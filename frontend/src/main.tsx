import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './pages/Register.tsx'
import { Login } from './pages/Login.tsx'
import { Dashboard} from './pages/Dashboard.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import SearchTasks from './pages/SearchTasks.tsx'
import TaskProfile from './pages/TaskProfile.tsx'
import UserProfile from './pages/UserProfile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <UserProvider>
        <BrowserRouter>

          <Routes>
              <Route path="/" element={<App />}>
                <Route path="cadastro" element = {<Register/>} />

                <Route path="login" element = {<Login/>} />

                <Route path="dashboard/:id" element={<Dashboard />}>
                  <Route index element={<UserProfile />}/>
                  <Route path="meu-perfil" element={<UserProfile />}/>
                  <Route path="buscar-tarefas" element={<SearchTasks />}>
                    <Route path="tarefa/:id" element={<TaskProfile />}/>
                  </Route>
                </Route>
              </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
  </StrictMode>,
)
