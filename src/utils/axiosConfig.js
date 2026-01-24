import axios from 'axios';

// Support both naming conventions
const baseURL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to get full image URL
export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // If path starts with /uploads, and baseURL includes /api, we might need to go up one level
    // OR just assume images are served from root/uploads
    // If baseURL is http://localhost:5000/api
    // We want http://localhost:5000/uploads/...

    const rootUrl = baseURL.replace(/\/api$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${rootUrl}${cleanPath}`;
};

export default api;
