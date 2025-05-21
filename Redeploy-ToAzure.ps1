# Redeploy the application to Azure with the latest changes

# Check if VS Code is running
$vsCodeProcess = Get-Process -Name "Code" -ErrorAction SilentlyContinue
if (-not $vsCodeProcess) {
    Write-Host "VS Code is not running. Please start VS Code and try again." -ForegroundColor Red
    exit 1
}

Write-Host "Preparing for redeployment to Azure..." -ForegroundColor Cyan

# Check for necessary files
$requiredFiles = @("server.js", "package.json", "web.config", "startup.sh", "robots933456.txt")
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "Missing required file: $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "All required files are present." -ForegroundColor Green
Write-Host "`nTo redeploy your application to Azure:"
Write-Host "1. Open VS Code if it's not already open"
Write-Host "2. Go to the Azure extension (Ctrl+Shift+A)"
Write-Host "3. Find your App Service under your subscription"
Write-Host "4. Right-click on the App Service and select 'Deploy to Web App...'"
Write-Host "5. Select the current folder when prompted"
Write-Host "`nAfter deployment (which may take a few minutes):"
Write-Host "1. Right-click on the App Service and select 'Browse Website'"
Write-Host "2. If you still see the 'waiting for content' message, wait a few minutes and refresh"
Write-Host "3. Check the logs by right-clicking on the App Service and selecting 'View Logs'"

Write-Host "`nDo you want to start the redeployment process now? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "Y" -or $response -eq "y") {
    Write-Host "`nPlease follow the VS Code prompts to complete the deployment." -ForegroundColor Cyan
    Write-Host "Starting VS Code Azure extension..."
    code --command azure-account.selectSubscriptions
} else {
    Write-Host "Redeployment cancelled. You can redeploy manually using the steps above." -ForegroundColor Yellow
}
