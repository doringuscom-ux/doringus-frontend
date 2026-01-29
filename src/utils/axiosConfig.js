import axios from 'axios';

// Base URL for API calls.
// In dev: uses '/api' (proxied by vite.config.js)
// In prod: uses the full backend URL from Render environment variables
const baseURL = import.meta.env.VITE_API_URL || '/api';

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

    // Remove '/api' suffix if baseURL is an absolute URL to get the root
    let rootUrl = baseURL;
    if (rootUrl.endsWith('/api')) {
        rootUrl = rootUrl.substring(0, rootUrl.length - 4);
    } else if (rootUrl === '/api') {
        // We are in local dev with proxy
        rootUrl = '';
    }

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${rootUrl}${cleanPath}`;
};

export default api;
