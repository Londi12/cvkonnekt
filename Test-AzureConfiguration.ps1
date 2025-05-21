Write-Host "Testing CVKonnekt application with Azure environment variables..." -ForegroundColor Cyan

# Set environment variables similar to Azure
$env:WEBSITE_SITE_NAME = "cvkonnekt"
$env:WEBSITE_PORT = "8080"
$env:PORT = "8080"

# Create temporary test folder
$testDir = Join-Path $PSScriptRoot "azure_test"
if (!(Test-Path $testDir)) {
    New-Item -ItemType Directory -Path $testDir | Out-Null
}

# Start the server
Write-Host "Starting server with Azure environment..." -ForegroundColor Green
node server.js

# Clean up
Remove-Item -Path $env:WEBSITE_SITE_NAME -Force -ErrorAction SilentlyContinue
Remove-Item -Path $env:WEBSITE_PORT -Force -ErrorAction SilentlyContinue
Remove-Item -Path $env:PORT -Force -ErrorAction SilentlyContinue
