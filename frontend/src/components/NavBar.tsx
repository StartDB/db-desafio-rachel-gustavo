import { NavLink } from "react-router";
import useUser from "../contexts/hook/useUser";
import styles from './NavBar.module.css';

export function NavBar() {
    const { user } = useUser();

    return (
        <nav className={styles.container}>
            <NavLink to="/" className={`${styles.link} link-nav`}>Página Inicial</NavLink>

            <div className={styles.col}>
                <NavLink to="/" className={`${styles.link} link-nav`}>Sobre nós</NavLink>
                <NavLink to="/" className={`${styles.link} link-nav`}>Como funciona?</NavLink>
            </div>

            <div className={styles.col}>
                <NavLink to="/cadastro" className={`${styles.link} link-nav`}>Cadastrar</NavLink>
                <NavLink to={user ? "/" : "/login"} className={`${styles.link} link-nav`}>{user ? "Sair" : "Login"}</NavLink>
            </div>
        </nav>
    )
}