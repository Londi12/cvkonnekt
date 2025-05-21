# Basic update script for app.js

Write-Host "Updating app.js with fixes for template selection..."
Copy-Item -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app.js" -Destination "c:\Users\Londi\Desktop\projects\resumebuilder\app.js.backup" -Force
Write-Host "Backup created as app.js.backup"

try {
    # First read the content of app.js.new
    $appJsNewContent = Get-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app.js.new" -Raw
    
    # Set the content to app.js
    Set-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app.js" -Value $appJsNewContent
    Write-Host "ResumeBuilder component updated."
    
    # Sleep briefly to ensure file is written
    Start-Sleep -Seconds 1
    
    # Now append the App component
    $appComponentContent = Get-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app-component.js" -Raw
    Add-Content -Path "c:\Users\Londi\Desktop\projects\resumebuilder\app.js" -Value $appComponentContent
    Write-Host "App component updated."
}
catch {
    Write-Host "Error updating app.js: $_"
    Write-Host "You may need to manually combine app.js.new and app-component.js into app.js"
}

Write-Host ""
Write-Host "Restart the server once the file updates are complete using:"
Write-Host "cd 'C:\Users\Londi\Desktop\projects\resumebuilder'; node server.js"
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
