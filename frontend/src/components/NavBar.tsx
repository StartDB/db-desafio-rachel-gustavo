import { NavLink } from "react-router";
import useUser from "../contexts/hook/useUser";
import styles from './NavBar.module.css';

export function NavBar() {
    const { user } = useUser();

    return (
        <nav className={styles.container}>
            <NavLink to="/" className={`${styles.link} link-nav`}>Home</NavLink>

            <div className={styles.col}>
                <NavLink to="/#sobre" className={`${styles.link} link-nav`}>Sobre nós</NavLink>
                <NavLink to="/#como-funciona" className={`${styles.link} link-nav`}>Como funciona?</NavLink>
                <NavLink to={user ? `dashboard/${user?.id}`:'/login'} className={`${styles.link} link-nav`}>Dashboard</NavLink>
            </div>

            <div className={styles.col}>
                {user ? <></>: <NavLink to="/cadastro" className={`${styles.link} link-nav`}>Cadastrar</NavLink>}
                <NavLink to={user ? "/logout" : "/login"} className={`${styles.link} link-nav`}>{user ? "Sair" : "Login"}</NavLink>
            </div>
        </nav>
    )
}