import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import apiEstrategiaPrecio from "../../services/apiEstrategiaPrecio";
import "../../assets/css/Configuracion.css";

export default function EstrategiaPrecio() {
  const [opcion, setOpcion] = useState("estandar");
  const [descuento, setDescuento] = useState("10");
  const [dinamico, setDinamico] = useState("50");

  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        const config = await apiEstrategiaPrecio("/precio", "GET");
        if (config.estrategia === "DESCUENTO") {
          setOpcion("descuento");
          setDescuento(config.descuentoPorcentaje.toString());
        } else if (config.estrategia === "DINAMICO") {
          setOpcion("dinamico");
          if (config.factorDinamico === 2) setDinamico("100");
          else if (config.factorDinamico === 1.5) setDinamico("50");
          else if (config.factorDinamico === 1.25) setDinamico("25");
        } else {
          setOpcion("estandar");
        }
      } catch (error) {
        console.error("Error cargando configuración:", error);
      }
    };
    cargarConfiguracion();
  }, []);

  const handleGuardar = async () => {
    try {
      let estrategia = "ESTANDAR";
      let descuentoPorcentaje = 0;
      let factorDinamico = 0;

      if (opcion === "descuento") {
        estrategia = "DESCUENTO";
        descuentoPorcentaje = parseFloat(descuento);
      } else if (opcion === "dinamico") {
        estrategia = "DINAMICO";
        switch (dinamico) {
          case "100":
            factorDinamico = 2;
            break;
          case "50":
            factorDinamico = 1.5;
            break;
          case "25":
            factorDinamico = 1.25;
            break;
          default:
            factorDinamico = 1;
        }
      }

      const payload = {
        estrategia,
        descuentoPorcentaje,
        factorDinamico
      };

      const resultado = await apiEstrategiaPrecio("/precio", "PUT", payload);
      alert("Configuración guardada exitosamente");
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

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
                  <option value="20">20%</option>
                  <option value="30">30%</option>
                  <option value="40">40%</option>
                  <option value="50">50%</option>

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
                  <option value="100">Demanda Extrema</option>
                  <option value="50">Demanda Alta</option>
                  <option value="25">Demanda Media</option>
                </Form.Select>
              </Col>
            </Row>
            <Form.Text muted>
              Nota: El descuento solo se aplicará si es seleccionado en el
              procesamiento de pedidos
            </Form.Text>

            <Row className="mt-3">
              <Col>
                <Button
                  variant="dark"
                  onClick={handleGuardar}
                >
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}