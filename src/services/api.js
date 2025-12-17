
const BASE_URL = 'http://localhost:8080/public';



export const api = async (
    endpoint = '/login',
    method = 'POST',
    body = null,
    options = { auth: true, credentials: false }
) => {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {};

    if (body) headers['Content-Type'] = 'application/json';


    if (options.auth) {
        const token = localStorage.getItem('token');
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (options.credentials) config.credentials = 'include';
    if (body) config.body = JSON.stringify(body);

    try {
        const resp = await fetch(url, config);
        if (resp.status === 204) return null;


        const texto = await resp.text();
        let datos;
        try {
            datos = texto ? JSON.parse(texto) : null;
        } catch {

            datos = texto;
        }

        if (!resp.ok) {
            const msg = (datos && datos.message) || (typeof datos === 'string' && datos) || `Error ${resp.status}`;
            throw new Error(msg);
        }

        return datos;
    } catch (err) {
        console.error('api error:', err);
        throw err;
    }
};

export default api;