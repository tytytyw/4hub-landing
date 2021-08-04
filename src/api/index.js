import axios from 'axios';

const api = axios.create({
    withCredentials: true,
});

api.defaults.withCredentials = true;

export default api;

export const cancelRequest = (keyName) => {
    if (typeof window === 'undefined') return;
    const cancelMethod = window.cancellationTokens[keyName];
    if (cancelMethod) cancelMethod();
    return;
}