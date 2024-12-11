import { Outlet } from 'react-router'
import './App.css'
import { NavBar } from './components/NavBar'
//import { useState } from 'react';

function App() {
  return (
    <>
        <header>
          <NavBar />
        </header>
        <Outlet />
    </>
  )
}

export default App
