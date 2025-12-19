
const api = async (endpoint = '/login', method = 'POST', body = null) => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };

    if (endpoint !== '/login' && token)
        headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`http://localhost:8080/public${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    });

    const texto = await res.text();
    const datos = texto ? JSON.parse(texto) : null;
    if (!res.ok) throw new Error(datos?.message || 'Error en la petición');
    return datos;
};

export default api;