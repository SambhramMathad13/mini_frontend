import axios from "axios";

const api = axios.create({
    // baseURL: 'https://djrestapi.pythonanywhere.com'
    baseURL: 'http://127.0.0.1:8000'
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access');
    if (token)
    {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default api;

