import { Outlet, useParams } from "react-router";
import { NavBarDashboard } from "../components/NavBarDashBoard";

export function Dashboard(){
    const { id } = useParams();

    return (
        <>
            <header>
                <NavBarDashboard />
            </header>
            <Outlet />
        </>

    )
}