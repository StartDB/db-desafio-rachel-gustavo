import { NavLink } from "react-router";
// import useUser from "../contexts/hook/useUser";

export function NavBarDashboard() {
    // const { user } = useUser();


    return (
        <nav>
            <NavLink to="/">Perfil</NavLink>
            <NavLink to="/cadastro">Minhas Tarefas</NavLink>
            <NavLink to="/login" >Buscar Tarefas</NavLink>
        </nav>
    )
    
}