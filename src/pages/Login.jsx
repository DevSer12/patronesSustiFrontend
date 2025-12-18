import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import api from '../services/api';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const payload = {
                username: username,
                password: password
            };
            const respuesta = await api('/login', 'POST', payload, { auth: false });
            const tokenRecibido = respuesta.token;
            const usuarioRecibido = { username: respuesta.username };

            Swal.fire({
                title: "¡Bienvenido!",
                text: "Ingresando al sistema...",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                login(usuarioRecibido, tokenRecibido);
                navigate('/pedidos');
            });
        } catch (err) {
            console.error('Error en login:', err);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al iniciar sesión",
                icon: "error"
            });
        }


    };

    return (

        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={6} lg={4}>

                    <Card className="shadow p-4">
                        <Card.Body>
                            <h2 className="text-center mb-4 text-primary">Iniciar Sesión en TechSolutions</h2>

                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="formBasicUser">
                                    <Form.Label>Nombre de Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingresa tu nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
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