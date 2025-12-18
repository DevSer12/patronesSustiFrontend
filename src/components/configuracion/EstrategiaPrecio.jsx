import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../assets/css/Configuracion.css";

export default function EstrategiaPrecio() {
  const [opcion, setOpcion] = useState("estandar");
  const [descuento, setDescuento] = useState("10");
  const [dinamico, setDinamico] = useState("alta");

  return (
    <div className="config-card">
      <h2>Estrategias de Precio</h2>
      <Row>
        <Col>
          <h5>Seleccionar Estrategia de Precio:</h5>
          <Form>
            <Row>
              <Col>
                <Form.Check
                  type="radio"
                  id="estandar"
                  name="estrategia"
                  label="Precio Estándar"
                  checked={opcion === "estandar"}
                  onChange={() => setOpcion("estandar")}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="radio"
                  id="descuento"
                  name="estrategia"
                  label="Precio con Descuento"
                  checked={opcion === "descuento"}
                  onChange={() => setOpcion("descuento")}
                />
              </Col>
              <Col xs="auto">
                <Form.Select
                  aria-label="Porcentaje de descuento"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                  disabled={opcion !== "descuento"}
                >
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="radio"
                  id="dinamico"
                  name="estrategia"
                  label="Precio Dinámico"
                  checked={opcion === "dinamico"}
                  onChange={() => setOpcion("dinamico")}
                />
              </Col>
              <Col xs="auto">
                <Form.Select
                  aria-label="Nivel de demanda"
                  value={dinamico}
                  onChange={(e) => setDinamico(e.target.value)}
                  disabled={opcion !== "dinamico"}
                >
                  <option value="alta">Alta demanda</option>
                  <option value="media">Demanda media</option>
                  <option value="baja">Baja demanda</option>
                </Form.Select>
              </Col>
            </Row>
            <Form.Text muted>
              Nota: El descuento solo se aplicará si es seleccionado en el
              procesamiento de pedidos
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </div>
  );
}