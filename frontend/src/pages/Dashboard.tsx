import { Outlet } from "react-router";
import { NavBarDashboard } from "../components/NavBarDashboard";

export function Dashboard(){
    // const { id } = useParams();

    return (
        <>
            <header>
                <NavBarDashboard />
            </header>
            <Outlet />
        </>

    )
}