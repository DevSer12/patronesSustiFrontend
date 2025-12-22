import { useState } from "react";
import ListadoPedidos from "../components/pedidos/ListadoPedidos";
import PagoPedidos from "../components/pedidos/PagoPedidos";

const Pedidos = () => {
    const [mostrarPago, setMostrarPago] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const handlePago = (pedidoId) => {
        setPedidoSeleccionado(pedidoId);
        setMostrarPago(true);
    };
   
    return (
        <>
            {!mostrarPago ? (
                <ListadoPedidos onPago={handlePago} />
            ) : (
                <PagoPedidos pedidoId={pedidoSeleccionado} onVolver={() => setMostrarPago(false)} />
            )}    
        </>
    );
};
export default Pedidos;
