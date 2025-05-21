@echo off
echo Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed! Please install Node.js from https://nodejs.org
    pause
    exit /b
)

echo Stopping any existing Node.js servers...
taskkill /F /IM node.exe >nul 2>nul

echo Installing http-server if needed...
npm list -g http-server >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing http-server globally...
    npm install -g http-server
)

echo Starting Resume Builder Server...
echo Server will be available at http://localhost:8080
echo Press Ctrl+C to stop the server
node server.js
