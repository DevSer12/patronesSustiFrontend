import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthContext } from "../../context/AuthProvider"; 
import { useContext } from "react";
import "../../assets/css/Configuracion.css";

export default function MetodoPago() {
  const [initialized, setInitialized] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [yape, setYape] = useState(false);
  const [plin, setPlin] = useState(false);
  const { actualizarMetodosPago } = useContext(AuthContext);

  useEffect(() => {
    const config = JSON.parse(localStorage.getItem('metodosPago') || '{}');
    if (config.paypal !== undefined) setPaypal(config.paypal);
    if (config.yape !== undefined) setYape(config.yape);
    if (config.plin !== undefined) setPlin(config.plin);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    const config = { paypal, yape, plin };
    localStorage.setItem('metodosPago', JSON.stringify(config));
    
    const activos = [];
    if (paypal) activos.push('PayPal');
    if (yape) activos.push('Yape');
    if (plin) activos.push('Plin');
    actualizarMetodosPago(activos);
  }, [paypal, yape, plin, initialized]);

  const manejarCambio = (metodo, estado) => {
    if (metodo === 'paypal') setPaypal(estado);
    if (metodo === 'yape') setYape(estado);
    if (metodo === 'plin') setPlin(estado);
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