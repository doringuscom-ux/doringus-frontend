import axios from 'axios';

// Support both naming conventions
let baseURL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';

// CRITICAL: Auto-fix for production connectivity
// Always force the production backend when running on the live domain
const PROD_BACKEND = 'https://influencer-backend-xjw2.onrender.com/api';

if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('doringus.com') || hostname.includes('onrender.com')) {
        baseURL = PROD_BACKEND;
        console.log('[Axios] Enforced Production Backend:', baseURL);
    }
}

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to get full image URL
export const getImageUrl = (path) => {
    if (!path) return '';

    let processedPath = path;

    // If the path contains localhost (legacy data issue), clean it up
    if (typeof processedPath === 'string' && processedPath.includes('localhost:')) {
        // Extract the part after /uploads/ or just the filename
        const uploadsIndex = processedPath.indexOf('/uploads/');
        if (uploadsIndex !== -1) {
            processedPath = processedPath.substring(uploadsIndex);
        }
    }

    if (processedPath.startsWith('http')) return processedPath;

    const rootUrl = baseURL.replace(/\/api$/, '');
    const cleanPath = processedPath.startsWith('/') ? processedPath : `/${processedPath}`;
    return `${rootUrl}${cleanPath}`;
};

export default api;
