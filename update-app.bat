@echo off
echo Updating app.js with fixes for template selection...
copy /Y "c:\Users\Londi\Desktop\projects\resumebuilder\app.js" "c:\Users\Londi\Desktop\projects\resumebuilder\app.js.backup"
echo Backup created as app.js.backup
type "c:\Users\Londi\Desktop\projects\resumebuilder\app.js.new" > "c:\Users\Londi\Desktop\projects\resumebuilder\app.js"
echo ResumeBuilder component updated.
type "c:\Users\Londi\Desktop\projects\resumebuilder\app-component.js" >> "c:\Users\Londi\Desktop\projects\resumebuilder\app.js"
echo App component updated.
echo.
echo The remaining code from the original app.js needs to be added manually.
echo.
echo Restart the server once the file updates are complete.
pause
