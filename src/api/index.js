import axios from 'axios';

const api = axios.create({
    withCredentials: true,
});

api.defaults.withCredentials = true;

export default api;