import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../assets/css/Configuracion.css";

export default function MetodoPago() {
  const [paypal, setPaypal] = useState(false);
  const [yape, setYape] = useState(false);
  const [plin, setPlin] = useState(false);

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
                  onChange={(e) => setPaypal(e.target.checked)}
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
                  onChange={(e) => setYape(e.target.checked)}
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
                  onChange={(e) => setPlin(e.target.checked)}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}