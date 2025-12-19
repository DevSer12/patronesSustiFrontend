import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Pedidos from "../pages/Pedidos.jsx";
import Configuracion from "../pages/Configuracion.jsx";
import Layout from "../components/Layout.jsx";
import { RutaProtegida } from "../components/RutaProtegida.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [    
            {
                path: "/pedidos",
                element: <Pedidos />,
            },
            {
                path: "/configuracion",
                element: <Configuracion />,
            },
        ],
    },

    {
        path: "/pedidos",
        element: (
            <RutaProtegida>
                <Pedidos />
            </RutaProtegida>
        ),
    },
    {
        path: "/configuracion",
        element: (
            <RutaProtegida>
                <Configuracion />
            </RutaProtegida>
        ),
    },
])