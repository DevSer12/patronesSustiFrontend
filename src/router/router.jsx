import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Pedidos from "../pages/Pedidos.jsx";
import Configuracion from "../pages/Configuracion.jsx";
import Layout from "../components/Layout.jsx";
import { RutaProtegida } from "../components/RutaProtegida.jsx";
import Pagos from "../pages/Pagos.jsx";

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
            {
                path: '/pagos/:pedidoId',
                element: 
                    <RutaProtegida>
                         <Pagos />
                    </RutaProtegida>
            },
        ],
    },

    
])