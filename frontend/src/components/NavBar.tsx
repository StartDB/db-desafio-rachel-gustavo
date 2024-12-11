import { NavLink } from "react-router";
import useUser from "../contexts/hook/useUser";

export function NavBar() {
    const { user } = useUser();

    return (
        <nav>
            <NavLink to="/">Página Inicial</NavLink>
            <NavLink to="/cadastro">Cadastrar</NavLink>
            <NavLink to={user ? "/" : "/login" }>{user ? "Sair" : "Login" }</NavLink>
        </nav>
    )
}