import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';


export default function Header() {
    const { logout } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const nombreUsuario = user ? user.username : '';

    const handleLogout = () => {
        logout();
    }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/pedidos">TechSolutions</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-collapse" />
        <Navbar.Collapse id="main-navbar-collapse">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/pedidos">Pedidos</Nav.Link>
            <Nav.Link as={Link} to="/configuracion">Configuración</Nav.Link>
          </Nav>
          <div className="ms-auto">
            <Navbar.Text>
              Usuario: <a href="#login">{nombreUsuario}</a>
            </Navbar.Text>
          </div>
          <div style={ { marginLeft: '20px' } }>
            <Form inline="true" onSubmit={handleLogout}>
              <Row>
                <Col xs="auto">
                  <Button type="submit" style={{ backgroundColor: '#767677ff', borderColor: '#767677ff', color: '#ffffff', fontSize: '10px', height: '22px', width: '70px',padding: '0' }} >Cerrar sesión</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}