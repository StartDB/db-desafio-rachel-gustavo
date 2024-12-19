import { Outlet } from "react-router";
import { NavBarDashboard } from "../components/NavBarDashboard";
import styles from './Dashboard.module.css';

export function Dashboard(){
    
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