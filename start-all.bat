@echo off
echo ========================================
echo Starting Influencer Platform
echo ========================================
echo.
echo This will start both backend and frontend servers in separate windows.
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173 (or next available port)
echo.
echo Press any key to continue...
pause > nul

echo.
echo Starting Backend Server...
start "Backend Server (Port 5000)" cmd /k "cd /d %~dp0 && start-backend.bat"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0 && start-frontend.bat"

echo.
echo ========================================
echo Both servers are starting in separate windows!
echo ========================================
echo.
echo Backend: Check the "Backend Server (Port 5000)" window
echo Frontend: Check the "Frontend Server" window
echo.
echo Press any key to exit this window...
pause > nul
