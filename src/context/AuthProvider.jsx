import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [metodosPago, setMetodosPago] = useState([]); 

    const login = (DatosUsuario, TokenNuevo) => {
        setUser(DatosUsuario);
        setToken(TokenNuevo);
        localStorage.setItem('user', JSON.stringify(DatosUsuario));
        localStorage.setItem('token', TokenNuevo);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };
    
    const actualizarMetodosPago = (metodos) => {
        setMetodosPago(metodos);
    };

    return <AuthContext.Provider value={{ user, token, login, logout,metodosPago, actualizarMetodosPago }}>{children}</AuthContext.Provider>;
};