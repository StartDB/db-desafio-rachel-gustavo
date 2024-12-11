import { Outlet } from "react-router";
import { NavBarDashboard } from "../components/NavBarDashboard";
import useUser from "../contexts/hook/useUser";

export function Dashboard(){
    const { user } = useUser();
    
    return (
        <>
            <header>
                <NavBarDashboard />
                <h1>{user?.firstName + " " + user?.lastName}</h1>
            </header>
            <Outlet />
        </>
    )
}