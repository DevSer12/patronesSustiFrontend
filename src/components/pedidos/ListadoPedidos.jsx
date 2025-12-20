import { Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import apiPedido from '../../services/apiPedido';

const ListadoPedidos = ({ onPago }) => {
    const [pedidos, setPedidos] = useState({});
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
        alert(`Mostrando detalles para:`);
    };

    const handlePagoPedidos = () => {
        onPago();
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
                            <div container className='d-flex justify-content-end gap-2'>
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
                            <tr>
                                <td>{pedidos.id}</td>
                                <td>{pedidos.cliente}</td>
                                <td>{pedidos.fechaCreacion}</td>
                                <td>{pedidos.monto}</td>
                                <td>{pedidos.estado}</td>
                                <td>
                                    <button
                                        onClick={() => handleVer()}
                                    >
                                        + Ver
                                    </button>
                                    <button
                                        onClick={() => handlePagoPedidos()}
                                    >
                                        Pago
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ListadoPedidos;