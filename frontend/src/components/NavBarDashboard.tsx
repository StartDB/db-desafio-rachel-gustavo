import { NavLink } from "react-router";

export function NavBarDashboard() {
    return (
        <nav>
            <NavLink to="/">Perfil</NavLink>
            <NavLink to="/cadastro">Minhas Tarefas</NavLink>
            <NavLink to="/login">Buscar</NavLink>
        </nav>
    )
    
}