@echo off
echo Starting Snek Game server...
echo.
echo If Node.js is installed, the server will start on http://localhost:3000
echo You can access the game from your mobile device using the IP address shown in the server output.
echo Make sure your mobile device is connected to the same WiFi network as this computer.
echo.
echo Press Ctrl+C to stop the server.
echo.

node server.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    echo Alternatively, you can open index.html directly in your browser,
    echo or use GitHub Pages to host the game for mobile testing.
    echo.
    pause
) 