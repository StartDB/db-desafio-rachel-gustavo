import { Outlet } from 'react-router'
import './App.css'
import { NavBar } from './components/NavBar'
import { NavBarDashboard } from './components/NavBarDashboard'
import { useState } from 'react';
import useUser from './contexts/hook/useUser';

function App() {
  const { user } = useUser();

  return (
    <>
        <header>
          <NavBar />
        </header>
        <main className="container-main">
          <Outlet />
        </main>
        <footer>
          <p>Teste</p>
        </footer>
    </>
  )
}

export default App
