import axios from 'axios';

const api = axios.create({
    withCredentials: false,
});

api.defaults.withCredentials = false;

export default api;

export const cancelRequest = async (keyName) => {
    if (typeof window === 'undefined') return;
    if (typeof window.cancellationTokens === 'undefined') return;
    const cancelMethod = window.cancellationTokens[keyName];
    if (!cancelMethod) return;
    await new Promise(resolve => resolve(cancelMethod.cancel())).then(() => {
        delete window.cancellationTokens[keyName];
        return true;
    });
}