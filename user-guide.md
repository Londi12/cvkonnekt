# Resume Builder - User Guide & Troubleshooting

## Starting the Application

### Quick Start
1. Double-click `run-simplified-server.bat`
2. Wait for your browser to open automatically
3. The Resume Builder should load at http://localhost:3000

### Alternative Start Methods
- **Using PowerShell:** Run `.\Start-Fixed-ResumeBuilder.ps1`
- **Using Node directly:** Open a command prompt and run `node server.js`
- **Using the diagnostic mode:** Open http://localhost:3000/diagnostic-mode.html

## Troubleshooting Common Issues

### 1. Blank Page / Nothing Loads

If you see a blank page:

1. **Check for console errors:**
   - Press F12 to open browser developer tools
   - Look for error messages in the Console tab

2. **Try Diagnostic Mode:**
   - Access http://localhost:3000/diagnostic-mode.html
   - If the diagnostic page loads but the main app doesn't, there's an issue with the React application

3. **Check if port 3000 is available:**
   - Run `.\React-Debugger.ps1` to check if port 3000 is already in use
   - If port 3000 is in use, run `taskkill /f /im node.exe` to free it

4. **Verify the server is running:**
   - Check for a Node.js command window that shows the server output
   - If not present, the server may have crashed - check for error messages

### 2. "Loading..." Message Never Disappears

If the loading indicator stays visible:

1. **Check React initialization:**
   - Press F12 to open browser developer tools
   - Look for errors in the Console tab related to React or script loading

2. **Try clearing browser cache:**
   - Press Ctrl+Shift+Delete in your browser
   - Clear cache and reload the page

3. **Verify script loading:**
   - In the developer tools Network tab, check if all scripts loaded successfully
   - Look for any failed or pending requests

### 3. Server Won't Start

If you get errors when starting the server:

1. **Check if port 3000 is already in use:**
   - Run `.\React-Debugger.ps1` to check port status
   - Use `taskkill /f /im node.exe` to kill any existing Node processes

2. **Check for Node.js installation:**
   - Run `node -v` to verify Node.js is installed
   - If not found, install Node.js from https://nodejs.org/

3. **Check for missing dependencies:**
   - Run `npm install` to install any missing packages
   - Check for errors during installation

### 4. Specific Features Not Working

If the app loads but certain features aren't working:

1. **Check the specific component:**
   - Look for errors in the console related to that component
   - Try navigating to different sections to see if other parts work

2. **Test with diagnostic tools:**
   - Use the diagnostic mode to test basic React functionality
   - Look for errors specific to the components that aren't working

## Using the Diagnostic Tools

We've created several diagnostic tools to help troubleshoot issues:

1. **React Debugger Script:**
   ```
   .\React-Debugger.ps1
   ```
   This script checks for common configuration issues and provides recommendations.

2. **Diagnostic Mode:**
   ```
   http://localhost:3000/diagnostic-mode.html
   ```
   A minimal React application to test if React is working correctly.

3. **Server Log:**
   The server window displays request logs and errors. Check this for server-side issues.

## Getting Help

If you continue to experience issues:

1. Check the `final-solution-summary.md` file for details on the fixes implemented
2. Review the browser's console errors for specific problems
3. Try the steps in `blank-page-fix-summary.md` for additional troubleshooting

Remember that most issues with the Resume Builder can be diagnosed using the browser's developer tools (F12) and our diagnostic utilities.
