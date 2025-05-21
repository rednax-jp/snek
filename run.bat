@echo off
echo Starting Snek Game server...
echo.
echo If Node.js is installed, the server will start on http://localhost:3000
echo If not, please open index.html directly in your browser.
echo.
echo Press Ctrl+C to stop the server.
echo.

node server.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    echo Alternatively, you can open index.html directly in your browser.
    echo.
    pause
) 