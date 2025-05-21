Write-Host "Resume Builder Fix Script" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host ""

# 1. Fix templates.js (make sure it's using window.templates)
Write-Host "1. Checking templates.js..." -ForegroundColor Yellow
$templatesContent = Get-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\templates.js" -Raw
if ($templatesContent -notmatch "window\.templates = templates") {
    Write-Host "   - Fixing templates.js export..." -ForegroundColor Yellow
    # Backup original file
    Copy-Item -Path "c:\Users\Londi\Desktop\projects\resumebuilder\templates.js" -Destination "c:\Users\Londi\Desktop\projects\resumebuilder\templates.js.backup" -Force
    
    # Replace export default with window.templates
    $templatesContent = $templatesContent -replace "export default templates;", "// Make templates available globally`nwindow.templates = templates;"
    Set-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\templates.js" -Value $templatesContent
    Write-Host "   - templates.js fixed!" -ForegroundColor Green
} else {
    Write-Host "   - templates.js is already fixed." -ForegroundColor Green
}

# 2. Update app.js with fixes
Write-Host ""
Write-Host "2. Updating app.js with fixes..." -ForegroundColor Yellow
# Backup original file
Copy-Item -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app.js" -Destination "c:\Users\Londi\Desktop\projects\resumebuilder\app.js.backup" -Force
Write-Host "   - Backup created as app.js.backup" -ForegroundColor Gray

# Update app.js with the fixed ResumeBuilder component
try {
    # First read the content of app.js.new
    $appJsNewContent = Get-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app.js.new" -Raw
    
    # Set the content to app.js
    Set-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app.js" -Value $appJsNewContent
    Write-Host "   - ResumeBuilder component updated." -ForegroundColor Green
    
    # Sleep briefly to ensure file is written
    Start-Sleep -Seconds 1
    
    # Now append the App component
    $appComponentContent = Get-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app-component.js" -Raw
    Add-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app.js" -Value $appComponentContent
    Write-Host "   - App component updated." -ForegroundColor Green
}
catch {
    Write-Host "   - Error updating app.js: $_" -ForegroundColor Red
    Write-Host "   - You may need to manually combine app.js.new and app-component.js into app.js" -ForegroundColor Yellow
}

# 3. Tips for completion
Write-Host ""
Write-Host "3. Next steps:" -ForegroundColor Yellow
Write-Host "   - Restart the server using: node server.js" -ForegroundColor Gray
Write-Host "   - Test template selection by clicking 'Use Template' buttons." -ForegroundColor Gray
Write-Host "   - Verify automatic advancement to Personal Information step." -ForegroundColor Gray
Write-Host ""
Write-Host "Server command to run:" -ForegroundColor Cyan
Write-Host "cd 'C:\Users\Londi\Desktop\projects\resumebuilder'; node server.js" -ForegroundColor Green
Write-Host ""
Write-Host "Fix script completed." -ForegroundColor Cyan
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
