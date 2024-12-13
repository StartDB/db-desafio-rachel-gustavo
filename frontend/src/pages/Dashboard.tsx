import { Outlet } from "react-router";
import { NavBarDashboard } from "../components/NavBarDashboard";
import useUser from "../contexts/hook/useUser";
import styles from './Dashboard.module.css';

export function Dashboard(){
    const { user } = useUser();
    
    return (
        <div className={styles.containerPage}>
            <header>
                <NavBarDashboard />
            </header>
            <main className="container-main-initial">
                <Outlet />
            </main>
        </div>
    )
}