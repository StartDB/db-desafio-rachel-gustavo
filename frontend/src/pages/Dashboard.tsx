import { Outlet } from "react-router";
import { NavBarDashboard } from "../components/NavBarDashboard";
import { testUser } from "../services/testUser";

export function Dashboard(){
    return (
        <>
            <header>
                <NavBarDashboard />
                <h1>{testUser.firstName}</h1>
            </header>
            <Outlet />
        </>
    )
}