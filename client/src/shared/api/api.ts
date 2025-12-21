import axios from 'axios';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const $api = axios.create({
    withCredentials: true,
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }

    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${__API__}/auth/refresh`, { withCredentials: true });
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('unauthorized');
        }
    }
    throw error;
});
