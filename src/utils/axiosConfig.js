import axios from 'axios';

// Base URL for API calls.
// In dev: uses '/api' (proxied by vite.config.js)
// In prod: uses import.meta.env.VITE_API_URL + '/api'
const getBaseUrl = () => {
    // Vite embeds this during build time
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    const isProd = import.meta.env.PROD;

    if (isProd) {
        // In production, we MUST hit the Render backend directly.
        const base = envUrl || 'https://doringus-backend.onrender.com/api';

        // Ensure trailing slash
        return base.endsWith('/') ? base : `${base}/`;
    }

    // Local Development: uses the env value if provided, or default to proxy
    const localBase = envUrl || '/api/';
    return localBase.endsWith('/') ? localBase : `${localBase}/`;
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
