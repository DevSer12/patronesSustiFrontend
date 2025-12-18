import { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    
    const [usuario, setusuario] = useState(null);
    
    const login = (usuarioDatos) => {
        setusuario(usuarioDatos);
       
        localStorage.setItem('usuario', JSON.stringify(usuarioDatos));
    };

    const logout = () => {
        setusuario(null);
      
        localStorage.removeItem('usuario');
    };
   
    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
