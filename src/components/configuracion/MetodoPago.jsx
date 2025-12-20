import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthContext } from "../../context/AuthProvider"; 
import { useContext } from "react";
import "../../assets/css/Configuracion.css";

export default function MetodoPago() {
  const [paypal, setPaypal] = useState(false);
  const [yape, setYape] = useState(false);
  const [plin, setPlin] = useState(false);
  const { actualizarMetodosPago } = useContext(AuthContext);

  const manejarCambio = (metodo, estado) => {
    let nuevoPaypal = paypal;
    let nuevoYape = yape;
    let nuevoPlin = plin;
    
    if (metodo === 'paypal') nuevoPaypal = estado;
    if (metodo === 'yape') nuevoYape = estado;
    if (metodo === 'plin') nuevoPlin = estado;
    
    setPaypal(nuevoPaypal);
    setYape(nuevoYape);
    setPlin(nuevoPlin);
    
    const activos = [];
    if (nuevoPaypal) activos.push('PayPal');
    if (nuevoYape) activos.push('Yape');
    if (nuevoPlin) activos.push('Plin');
    
    actualizarMetodosPago(activos);
  }; 
  return (
    <div className="config-card">
      <h2>Configuración de Pasarelas</h2>
      <Row>
        <Col>
          <h5>Pasarelas de Pago:</h5>
          <Form>
            <Row>
              <Col>
                <Form.Check
                  type="switch"
                  id="paypal-switch"
                  label="PayPal"
                  checked={paypal}
                  onChange={(e) => manejarCambio('paypal', e.target.checked)}  
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="switch"
                  id="yape-switch"
                  label="Yape"
                  checked={yape}
                  onChange={(e) => manejarCambio('yape', e.target.checked)}  
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="switch"
                  id="plin-switch"
                  label="Plin"
                  checked={plin}
                  onChange={(e) => manejarCambio('plin', e.target.checked)}  
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}