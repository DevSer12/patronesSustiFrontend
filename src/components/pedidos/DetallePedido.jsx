import React from 'react'
import { Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

const DetallePedido = () => {
  return (
    <>
        <div className="container mt-4 border p-4 rounded ">
            <Row className="mb-3">
                <h2>Detalle de Pedidos</h2>
            </Row>
            <Row>
                <Form.group className="mb-3">
                    <Form.Label htmlFor="">Estado: Procesado</Form.Label>
                    <Form.Label htmlFor="">cliente: Cliente 01</Form.Label>
                    <Form.Select className="" ></Form.Select>
                    <Form.Select className="" ></Form.Select>  
                </Form.group>
            </Row>
        </div>
           
    </>

  )
}
export default DetallePedido