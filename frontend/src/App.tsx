import { Link, Outlet } from 'react-router'
import './App.css'

function App() {

  return (
    <>
      <header>
        <Link to="/cadastro">Cadastrar</Link>
        <Link to="/login"></Link>
      </header>
     <Outlet />
    </>
  )
}

export default App
