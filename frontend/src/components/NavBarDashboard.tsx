import { NavLink } from "react-router";
import styles from './NavBarDashboard.module.css';
// import useUser from "../contexts/hook/useUser";

export function NavBarDashboard() {
    // const { user } = useUser();


    return (
        <nav className={styles.container}>
            <div className={styles.col}>
                <NavLink to="meu-perfil" className={`${styles.link} link-nav`}>Perfil</NavLink>
                <NavLink to="minhas-tarefas" className={`${styles.link} link-nav`}>Minhas Tarefas</NavLink>
                <NavLink to="buscar-tarefas" className={`${styles.link} link-nav`}>Buscar Tarefas</NavLink>
            </div>
        </nav>
    )
    
}