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
          {user? <NavBarDashboard /> : null}
        </header>
        <main className="container">
          <section className="container-section">
            <Outlet />
          </section>
        </main>
        <footer>
          <p>Teste</p>
        </footer>
    </>
  )
}

export default App
