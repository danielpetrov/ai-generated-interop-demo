# Quick Restart Script for All Dev Servers
# This clears Vite cache and restarts all three apps

Write-Host "🔄 Restarting all development servers..." -ForegroundColor Cyan
Write-Host ""

# You'll need to run this with three separate terminal windows
# Or use the commands below in separate terminals

Write-Host "📋 INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host "Open THREE separate PowerShell terminals and run these commands:"
Write-Host ""

Write-Host "Terminal 1 - Platform:" -ForegroundColor Green
Write-Host "cd platform"
Write-Host "npm run dev"
Write-Host ""

Write-Host "Terminal 2 - Client List:" -ForegroundColor Green  
Write-Host "cd client-list"
Write-Host "npm run dev"
Write-Host ""

Write-Host "Terminal 3 - Portfolio:" -ForegroundColor Green
Write-Host "cd client-portfolio"
Write-Host "npm run dev"
Write-Host ""

Write-Host "⏳ Wait for all three to show 'ready', then open:" -ForegroundColor Cyan
Write-Host "http://localhost:5175" -ForegroundColor Blue
