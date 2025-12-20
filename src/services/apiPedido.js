const apiPedido = async (endpoint, method , body ) => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token)
        headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`http://localhost:8080/${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    }); 
    const texto = await res.text();
    const datos = texto ? JSON.parse(texto) : null;
    if (!res.ok) throw new Error(datos?.message || 'Error en la petición');
    return datos;
}
export default apiPedido;