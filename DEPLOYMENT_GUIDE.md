# Production Deployment Checklist & Guide

## 1. Environment Variables
I have created a `.env.production` file for your local build tests, but for the actual deployment on Render:

- [ ] **Frontend Environment Variables**: Go to your Render Frontend Service > Environment.
  - Add `VITE_API_URL` with value: `https://doringus-backend.onrender.com/api`

## 2. CORS & Domain Configuration (CRITICAL)
Your backend is currently configured to allow CORS from `https://doringus.com`.
- [ ] **If using a Custom Domain**: Ensure you configure `doringus.com` in Render's "Custom Domains" settings for your frontend service.
- [ ] **If using a Render Subdomain (e.g., `doringus-frontend.onrender.com`)**: You **MUST** update your Backend's `CLIENT_URL` (or CORS allowed origins) to include this new URL, otherwise API calls will fail with CORS errors.

## 3. Deployment Settings on Render
When creating your **Static Site** on Render, use these settings:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: Ensure it matches your local version (usually default is fine, or set `NODE_VERSION` env var).

## 4. SPA Routing
- [x] I have verified `public/_redirects` exists and is copied to `dist/_redirects`.
- This file contains `/* /index.html 200`, which handles React Router (SPA) routing on Render automatically.

## 5. Clean Up & Optimizations
- [x] Verified no `localhost` or hardcoded `127.0.0.1` URLs in source code.
- [x] Verified `axiosConfig.js` correctly uses `VITE_API_URL`.
- [x] Verified Build (`npm run build`) succeeds locally.

## 6. Post-Deployment Verification
After deployment is live:
1. Open the browser console (F12).
2. Check the Network tab.
3. Reload the page.
4. Verify requests to `/api/...` are going to `https://doringus-backend.onrender.com/api/...`
5. Test Login/Registration specifically (to verify CORS cookies/headers).
6. Test Image Uploads (to verify Static file serving from backend).

## 7. SEO Note
- Your `index.html` currently contains `<meta name="robots" content="noindex, nofollow" />`.
- **Action**: If this is a live production site for public users, you should REMOVE this line in `index.html` so Google can index your site.

## 8. Troubleshooting
- If you see **404 on Refresh**: Ensure `_redirects` is in the publish folder (it is verified).
- If you see **Network Error / CORS**: Check Backend Logs on Render. It usually means the Origin header didn't match the Backend's allowed list.
