@echo off
echo ========================================
echo Starting Frontend Development Server
echo ========================================
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)
echo.
echo Starting Vite dev server...
npm run dev
