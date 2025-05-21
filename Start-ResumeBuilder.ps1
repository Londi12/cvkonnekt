# Start-ResumeBuilder.ps1
# A PowerShell script to start the Resume Builder application

Write-Host "Starting Resume Builder Server..." -ForegroundColor Cyan

# Kill any existing Node.js processes that might be using the port
try {
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        Write-Host "Stopping existing Node.js processes..." -ForegroundColor Yellow
        Stop-Process -Name "node" -Force
        Start-Sleep -Seconds 1
    }
} catch {
    # No node processes found, continue
}

# Start the server
Write-Host "Starting server..." -ForegroundColor Green
cd "C:\Users\Londi\Desktop\projects\resumebuilder"
node server.js

# Note: This script will not return until the server is stopped
# Press Ctrl+C to stop the server
