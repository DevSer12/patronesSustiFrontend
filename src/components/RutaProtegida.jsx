import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export const RutaProtegida = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/" replace />;
};
