@echo off
echo ============================================
echo   TranslateHub - Starting Backend + Frontend
echo ============================================

REM Start Django backend in a new window
start "TranslateHub Backend" cmd /k "cd Developer\backend && venv\Scripts\activate && python manage.py runserver"

REM Wait a few seconds so backend starts first
timeout /t 5 /nobreak > nul

REM Start frontend server in a new window
start "TranslateHub Frontend" cmd /k "cd Developer\frontend && python -m http.server 5500"

REM Wait a moment then open the website in the default browser
timeout /t 3 /nobreak > nul
start http://localhost:5500

echo Backend and Frontend donhi chalu zaले!
echo Ha window band karu naka - backend/frontend chalू rahण्यासाठी tyanchya
echo swतंत्र windows band karू naka.
pause
