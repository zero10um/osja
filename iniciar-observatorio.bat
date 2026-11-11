@echo off
rem Inicia o servidor local do OJSA e abre o navegador. Feche esta janela para desligar.
cd /d "%~dp0"
start "" http://localhost:5173
node servidor\servidor.js
pause
