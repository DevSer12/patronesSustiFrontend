import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function Header() {
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
              Usuario: <a href="#login">Admin</a>
            </Navbar.Text>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}