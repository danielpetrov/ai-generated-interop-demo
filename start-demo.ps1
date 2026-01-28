# Start all three servers for the interop demo
# Platform: 5175, Client List: 3001, Client Portfolio: 3002

Write-Host "Starting io.Connect Browser Platform Demo..." -ForegroundColor Cyan
Write-Host ""

# Start Client List in a new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client-list'; npm run dev"

# Start Client Portfolio in a new terminal  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client-portfolio'; npm run dev"

# Wait for child apps to start
Write-Host "Waiting for client apps to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start Platform in current terminal
Write-Host ""
Write-Host "Starting Platform on http://localhost:5175" -ForegroundColor Green
Write-Host "Client List on http://localhost:3001" -ForegroundColor Gray
Write-Host "Client Portfolio on http://localhost:3002" -ForegroundColor Gray
Write-Host ""

Set-Location "$PSScriptRoot\platform"
npm run dev
