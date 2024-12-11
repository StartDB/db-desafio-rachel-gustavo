import { NavLink } from "react-router";

export function NavBar() {
    return (
        <nav>
            <NavLink to="/">Página Inicial</NavLink>
            <NavLink to="/cadastro">Cadastrar</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
    
}