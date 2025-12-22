import { useParams, useNavigate } from "react-router-dom";
import PagoPedidos from "../components/pedidos/PagoPedidos";

const Pagos = () => {
    const { pedidoId } = useParams();
    const navigate = useNavigate();
    
    return (
        <>
            
            <PagoPedidos pedidoId={pedidoId} onVolver={() => navigate('/pedidos')} />
        </>
    );
}
export default Pagos;