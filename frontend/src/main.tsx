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
import MyTasks from './pages/MyTasks.tsx'
import Logout from './pages/Logout.tsx'
import PublicProfile from './pages/PublicProfile.tsx'
import CreateTask from './pages/CreateTask.tsx'
import HomePage from './pages/HomePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <UserProvider>
        <BrowserRouter>

          <Routes>
              <Route path="/" element={<App />}>
                <Route index element = {<HomePage/>} />
                <Route path="cadastro" element = {<Register/>} />

                <Route path="login" element = {<Login/>} />
                <Route path="logout" element = {<Logout/>}/>

                <Route path="dashboard/:id" element={<Dashboard />}>
                  <Route index element={<UserProfile />}/>
                  <Route path="meu-perfil" element={<UserProfile />}/>
                  <Route path="minhas-tarefas" element={<MyTasks />}/>
                  <Route path="buscar-tarefas" element={<SearchTasks />} />
                  <Route path="tarefa/:taskId" element={<TaskProfile />}/> 
                  <Route path="criar-tarefa" element={<CreateTask />}/>
                  <Route path="tarefa/:taskId/perfil-publico/:role/:publicId" element={<PublicProfile />}/>
                </Route>
              </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
  </StrictMode>,
)
