import { Outlet } from "react-router-dom";
import Header from "./subcomponents/Header";

export default function Layout() {
    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}