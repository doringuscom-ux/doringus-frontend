# 🚀 Influencer Platform - Startup Guide

## Quick Start (Recommended)

**The easiest way to start your application:**

1. Navigate to your project folder:
   ```
   c:\Users\Digital Orra\.gemini\antigravity\scratch\influencer-platform-react
   ```

2. **Double-click** `start-all.bat`

3. Two command windows will open:
   - **Backend Server (Port 5000)** - Keep this window open
   - **Frontend Server** - Keep this window open

4. Wait for both servers to start (about 10-15 seconds)

5. Open your browser to the URL shown in the Frontend window (usually `http://localhost:5173`)

✅ **Done!** Your application is now running.

---

## Alternative: Manual Startup

If you prefer to start servers separately:

### Option A: Start Backend Only
Double-click `start-backend.bat`

### Option B: Start Frontend Only
Double-click `start-frontend.bat`

### Option C: Start Both Manually
1. Open **first terminal** and run:
   ```bash
   cd server
   node index.js
   ```

2. Open **second terminal** and run:
   ```bash
   npm run dev
   ```

---

## 🔍 How to Verify Everything is Working

### Backend Server (Port 5000)
- ✅ Look for: `Server running on http://localhost:5000`
- ✅ Test API: Open `http://localhost:5000/api/categories` in browser
- ✅ Should see JSON data with categories

### Frontend Server (Port 5173)
- ✅ Look for: `Local: http://localhost:5173/`
- ✅ Open the URL in your browser
- ✅ Website should load without errors

---

## ⚠️ Troubleshooting

### "Cannot connect to server" Error

**This means the backend is not running!**

**Solution:**
1. Check if the "Backend Server (Port 5000)" window is open and running
2. If not, run `start-backend.bat`
3. Wait for the message: `Server running on http://localhost:5000`
4. Refresh your browser

### Port 5000 Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
1. Close all command windows
2. Open Task Manager (Ctrl+Shift+Esc)
3. Find and end any `node.exe` processes
4. Run `start-all.bat` again

### Port 5173 Already in Use

**The frontend will automatically use the next available port** (5174, 5175, etc.)
- Check the Frontend Server window for the actual URL
- Use that URL in your browser

### Dependencies Missing

If you see errors about missing packages:

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
npm install
```

### Backend Data Files Missing

If you get file read errors, the backend will automatically create empty data files on first run. Just restart the backend server.

---

## 📝 Important Notes

1. **Both servers must run simultaneously** for the application to work
2. **Keep both command windows open** while using the application
3. **Don't close the windows** - this will stop the servers
4. **To stop the servers**: Close both command windows or press `Ctrl+C` in each window

---

## 🌐 URLs Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Backend API | http://localhost:5000 | REST API endpoints |
| Frontend | http://localhost:5173 | React application |
| API Categories | http://localhost:5000/api/categories | Test endpoint |
| API Influencers | http://localhost:5000/api/influencers | Test endpoint |

---

## 🔐 Default Admin Credentials

- **Username:** `AddaLegend_9`
- **Password:** `S0c!al@ddA#97`

Use these to access the Admin Panel at `/admin`

---

## 💡 Tips

- **Bookmark** `http://localhost:5173` for quick access
- **Keep terminals visible** to monitor for errors
- **Check backend logs** if API calls fail
- **Restart both servers** if you make changes to server code
- **Frontend hot-reloads** automatically when you edit React components

---

## Need Help?

If you continue to have issues:
1. Make sure Node.js is installed (`node --version`)
2. Make sure you're in the correct directory
3. Check both terminal windows for error messages
4. Try closing all terminals and running `start-all.bat` again
