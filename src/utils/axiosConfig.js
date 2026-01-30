import axios from 'axios';

// Base URL for API calls.
// In dev: uses '/api' (proxied by vite.config.js)
// In prod: uses import.meta.env.VITE_API_URL + '/api'
const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    // Strictly use the environment variable.
    // Ensure we point to /api if not already there
    return envUrl && envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const baseURL = getBaseUrl();

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Helper to get full image URL.
 * Automatically handles relative backend paths by prefixing the base URL.
 */
export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Remove '/api' suffix to get the root domain for static uploads
    let rootUrl = baseURL;
    if (rootUrl.endsWith('/api')) {
        rootUrl = rootUrl.substring(0, rootUrl.length - 4);
    }

    // In local devProxy cases ('/api'), rootUrl becomes empty string, which is correct (relative path)
    if (rootUrl === '/api') rootUrl = '';

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${rootUrl}${cleanPath}`;
};

export default api;
