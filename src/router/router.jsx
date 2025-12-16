import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Pedidos from "../pages/Pedidos.jsx";
import Configuracion from "../pages/Configuracion.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/pedidos",
        element: <Pedidos />,
    },
    {
        path: "/configuracion",
        element: <Configuracion />,
    },
])