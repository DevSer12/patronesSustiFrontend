import ListadoPedidos from "../components/pedidos/ListadoPedidos";
import { useNavigate } from "react-router-dom";

const Pedidos = () => {
    const navigate = useNavigate();

    const handlePago = (pedidoId) => {
         navigate(`/pagos/${pedidoId}`);
    };
   
    return (
        <>
            <ListadoPedidos onPago={handlePago} />
        </>
    );
};
export default Pedidos;
