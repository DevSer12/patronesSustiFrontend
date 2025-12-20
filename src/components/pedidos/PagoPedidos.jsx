import React from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import apiPedido from '../../services/apiPedido';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthProvider";

const PagoPedidos = ({ onVolver }) => {
  const [pedidos, setPedidos] = useState({});
  const { metodosPago } = useContext(AuthContext);
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

  const mensaje = () => {
    Swal.fire({
      title: 'Pago Procesado',
      text: 'El pago del pedido ha sido procesado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  return (
    <>
      <div className="container mt-4 border p-4 rounded">
        <Row className="mb-3">
          <Col className="mb-3 col-9">
            <h2>Pedidos</h2>
          </Col>
          <Col className="mt-3 mb-3 col-3">
            <Form.Label htmlFor="" className='fw-bold'>Estado: {pedidos.estado}</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3 col-9">
            <div className="mb-3">
              <Table striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{pedidos.id}</td>
                    <td>{pedidos.cliente}</td>
                    <td>{pedidos.fechaCreacion}</td>
                    <td>{pedidos.monto}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col className="mb-3 col-3 align-items-right">
            <Form className=' '>
              <Form.Group className='mb-5'>
                <Form.Label htmlFor="">Metodo de Pago:</Form.Label>
                <Form.Select className="form-select w-50" aria-label="Metodo de pago">
                  <option value="">Seleccionar método</option>
                  {metodosPago.map((metodo) => (
                    <option key={metodo} value={metodo}>
                      {metodo}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label htmlFor="" className='w-50'>Estrategia de Precio:</Form.Label>
                <br />
                <Form.Control className="mb-4 w-50" type="text" placeholder="" name='txtestrategia' readOnly />
                <br />
                <Form.Label htmlFor="" className=''>Monto a Pagar:</Form.Label>
                <br />
                <Form.Control type="text" name='txtmonto' className='w-50' value={pedidos.montoFinal} readOnly />
              </Form.Group>
              <Button className='bg-dark w-50' onClick={mensaje}>Procesar Pago</Button>
              <br /><br />
              <Button className='bg-dark w-50' onClick={onVolver}>Cancelar Pedido</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default PagoPedidos