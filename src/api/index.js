import axios from 'axios';

const api = axios.create({
    withCredentials: true,
});

api.defaults.withCredentials = true;

export default api;

export const cancelRequest = async (keyName) => {
    if (typeof window === 'undefined') return;
    const cancelMethod = window.cancellationTokens[keyName];
    if (!cancelMethod) return;
    await new Promise(resolve => resolve(cancelMethod.cancel())).then(() => {
        delete window.cancellationTokens[keyName];
        return true;
    });
}