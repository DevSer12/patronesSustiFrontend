import { Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import apiPedido from '../../services/apiPedido';
import Swal from 'sweetalert2';


const ListadoPedidos = ({ onPago }) => {
    const [pedidos, setPedidos] = useState([]);


    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const pedidos = await apiPedido('api/pedidos', 'GET');
                setPedidos(pedidos);
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }
        }
        fetchPedidos();
    }, []);

    const handleVer = () => {
       Swal.fire({ title: 'VISTA EN DESARROLLO!', icon: 'success', timer: 1500, showConfirmButton: false });
    };

    const handlePagoPedidos = (idPedido) => {
        onPago(idPedido);
    };

    return (
        <>
            <div className="container mt-4 border p-4 rounded ">
                <div className="mb-3">
                    <Row className="mb-3">
                        <Col className="mb-3 col-6">
                            <h2>Pedidos</h2>
                        </Col>
                        <Col className="mt-3 mb-3 col-6">
                            <div className='d-flex justify-content-end gap-2'>
                                <Form.Control type="text" placeholder="cliente" name='txtcliente' />
                                <Form.Control type="text" placeholder="estado" name='txtestado' />
                                <Form.Control type="text" placeholder="fecha" name='txtfecha' />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mb-3">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((pedido) => (
                                <tr key={pedido.id}>
                                    <td>{pedido.id}</td>
                                    <td>{pedido.cliente}</td>
                                    <td>{pedido.fechaCreacion}</td>
                                    <td>{pedido.monto}</td>
                                    <td>{pedido.estado}</td>
                                    <td>
                                        <button
                                            onClick={() => handleVer()}
                                        >
                                            + Ver
                                        </button>
                                        {pedido.estado === 'PENDIENTE' && (
                                            <button
                                                onClick={() => handlePagoPedidos(pedido.id)}
                                            >
                                                Pago
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ListadoPedidos;