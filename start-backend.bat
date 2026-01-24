@echo off
echo ========================================
echo Starting Backend Server on Port 5000
echo ========================================
cd server
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)
echo.
echo Starting server...
node index.js
