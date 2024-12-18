import { Outlet, useLocation } from 'react-router'
import './App.css'
import { NavBar } from './components/NavBar'
import { useEffect } from 'react'


function App() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash])

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container-main-initial">
        <Outlet />
      </main>
      <footer className="containerMainFooter">
        <address>
          <h4>Endereço:</h4>
          <p>Rua das Magnólias, 123 - Bairro Vista Serena</p>
          <p>Porto Alegre - RS - CEP: 91000-000</p>
        </address>
        <address>
          <h4>Entre em contato:</h4>
          <p><span>Email:</span> <a href="mailto:contato@cuidarmais.com">contato@cuidarmais.com</a></p>
          <p><span>Telefone:</span> <a href="tel:+555112345678">(51) 1234-5678</a></p>
        </address>
        <div>
          <p>&copy; 2024 Cuidar Mais. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  )
}

export default App
