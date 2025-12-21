import { Col, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import apiPedido from '../../services/apiPedido';
import apiPrecio from '../../services/apiPrecio';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthProvider";
import '../../assets/css/Pedidos.css';

const PagoPedidos = ({ onVolver }) => {
  const [pedidos, setPedidos] = useState({});
  const [estrategia, setEstrategia] = useState('');
  const [montoFinal, setMontoFinal] = useState(0);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('');
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

  useEffect(() => {
    const cargarEstrategia = async () => {
      try {
        const config = await apiPrecio('/precio', 'GET');
        const nombreEstrategia = obtenerNombreEstrategia(config.estrategia, config.descuentoPorcentaje, config.factorDinamico);
        setEstrategia(nombreEstrategia);
        calcularMonto(pedidos.monto, config.estrategia, config.descuentoPorcentaje, config.factorDinamico);
      } catch (error) {
        console.error('Error fetching estrategia:', error);
      }
    }
    cargarEstrategia();
  }, [pedidos.monto]);

  const obtenerNombreEstrategia = (estrat, descuento, factor) => {
    if (estrat === 'ESTANDAR') return 'Precio Estándar';
    if (estrat === 'DESCUENTO' && descuento) return `Precio con Descuento ${descuento}%`;
    if (estrat === 'DINAMICO' && factor) {
      const porcentajeAumento = ((factor - 1) * 100).toFixed(0);
      return `Precio Dinámico ${porcentajeAumento}%`;
    }
    return '';
  };

  const calcularMonto = (monto, estrat, descuento, factor) => {
    if (!monto) return;
    let nuevoMonto = monto;
    
    if (estrat === 'DESCUENTO' && descuento) {
      nuevoMonto = monto - (monto * (descuento / 100));
    } else if (estrat === 'DINAMICO' && factor) {
      nuevoMonto = monto * factor;
    }
    
    setMontoFinal(nuevoMonto);
  };

  const handleProcesarPago = async () => {
    if (!metodoSeleccionado) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Debe seleccionar un método de pago.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      title: '¿Procesar Pago?',
      text: `Se procesará un pago de $${montoFinal.toFixed(2)} mediante ${metodoSeleccionado}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí, procesar',
      cancelButtonText: 'Cancelar',

    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const pagoData = {
            metodoPago: metodoSeleccionado,
            monto: montoFinal,
            pedido: { ...pedidos, montoFinal: montoFinal }
          };
          await apiPedido(`api/pago`, 'POST', pagoData);
          Swal.fire({
            title: 'Pago Procesado',
            text: 'El pago del pedido ha sido procesado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            setPedidos({ ...pedidos, estado: 'PAGADO' });
            onVolver();
          });
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo procesar el pago.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error procesando pago:', error);
        }
      }
    });
  }

  const handleCancelarPedido = async () => {
    Swal.fire({
      title: '¿Cancelar Pedido?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const cancelarData = {
            estado: 'CANCELADO'
          };
          await apiPedido(`api/pedidos/${pedidos.id}/cancelar`, 'PUT', cancelarData);
          Swal.fire({
            title: 'Pedido Cancelado',
            text: 'El pedido ha sido cancelado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            setPedidos({ ...pedidos, estado: 'CANCELADO' });
            onVolver();
          });
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo cancelar el pedido.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error cancelando pedido:', error);
        }
      }
    });
  };

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
                <Form.Label htmlFor="" className='form-label-small'>Método de Pago:</Form.Label>
                <Form.Select 
                  className="form-select form-full-width" 
                  aria-label="Metodo de pago"
                  value={metodoSeleccionado}
                  onChange={(e) => setMetodoSeleccionado(e.target.value)}
                >
                  <option value="">Seleccionar método</option>
                  {metodosPago.map((metodo) => (
                    <option key={metodo} value={metodo}>
                      {metodo}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label htmlFor="" className='form-label-small'>Estrategia de Precio:</Form.Label>
                <br />
                <Form.Control className="mb-4 form-full-width" type="text" placeholder="" name='txtestrategia' value={estrategia} readOnly />
                <br />
                <Form.Label htmlFor="" className='form-label-small'>Monto a Pagar:</Form.Label>
                <br />
                <Form.Control type="text" name='txtmonto' className='form-full-width' value={montoFinal.toFixed(2)} readOnly />
              </Form.Group>
              <Button className='bg-dark button-full-width' onClick={handleProcesarPago}>Procesar Pago</Button>
              <br /><br />
              <Button className='bg-dark button-full-width' onClick={handleCancelarPedido}>Cancelar Pedido</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default PagoPedidos