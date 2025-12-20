import { useState } from "react";
import ListadoPedidos from "../components/pedidos/ListadoPedidos";
import PagoPedidos from "../components/pedidos/PagoPedidos";


const Pedidos = () => {
    const [mostrarPago, setMostrarPago] = useState(false);
  

    const handlePagoPedidos = () => {
        setMostrarPago(true);
    };

    const handleVolver = () => {
        setMostrarPago(false);
    };

    return (
        <>

            {mostrarPago ? (
                <PagoPedidos onVolver={handleVolver} />
            ) : (
                <ListadoPedidos onPago={handlePagoPedidos} />
            )}

    
        </>
    );
};
export default Pedidos;
