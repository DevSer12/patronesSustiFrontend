import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import apiLogin from '../services/apiLogin';


const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await apiLogin('/login', 'POST', { username, password });
            login({ username }, token);
            Swal.fire({ title: '¡Bienvenido!', icon: 'success', timer: 1500, showConfirmButton: false });
            navigate('/pedidos');
        } catch {
            Swal.fire({ title: 'Error', text: 'Credenciales incorrectas', icon: 'error' });
        }
    };


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
         
           <Row className="w-100 justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow p-4">
                        <Card.Body>
                            <h2 className="text-center mb-4 text-primary">TechSolutions</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicUser">
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingresa tu nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Iniciar Sesión
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;