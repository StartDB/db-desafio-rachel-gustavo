import { Link, Outlet } from 'react-router'
import './App.css'
import { NavBar } from './components/navBar'

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
