import { Outlet } from "react-router-dom"

import { Header } from "../header"

export function Layout() {
    return(
        <>
            <Header></Header>
            <Outlet/>        
        </>
    )
}