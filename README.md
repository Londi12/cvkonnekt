# Resume Builder Fix Instructions

This document provides instructions on how to fix the template selection issues in the Resume Builder application.

## Issues Fixed

1. ✅ SVG rendering in template previews - Fixed by proper SVG encoding in templates.js
2. ✅ Template selection functionality - Fixed by updating localStorage access in the App component
3. ✅ Auto-advancement to Personal Information step - Fixed by adding proper useEffect hook
4. ✅ Syntax errors in app.js - Fixed extra closing curly braces
5. ✅ "ReferenceError: exports is not defined" - Fixed by changing export syntax in templates.js

## How to Apply the Fixes (Already Applied)

The fixes have been applied to your project. Here's what was done:

1. Fixed templates.js:
   - Changed `export default templates;` to `window.templates = templates;`

2. Fixed app.js:
   - Updated the useEffect hook in ResumeBuilder component to:
     - Check if a template was selected from localStorage
     - Clear localStorage after using the values
     - Automatically advance to Personal Information step if a template was selected
   - Fixed syntax errors

3. Fixed App component:
   - Improved hash change handling for template selection

## Testing the Fixes

The changes have been applied and the server is now running. To test:

1. Navigate to the Templates page
2. Click "Use Template" on any template
3. Verify that you're automatically redirected to the Personal Information step
4. Check browser console for confirmation messages

## Running the Server

To restart the server in the future, use this PowerShell command:

```powershell
cd "C:\Users\Londi\Desktop\projects\resumebuilder"
node server.js
```

## Troubleshooting

If you encounter any issues:
- Check the browser console for JavaScript errors
- Verify that templates.js is properly loaded before app.js in index.html
- Clear browser cache or use incognito mode to test changes
- If needed, run the fix script again: `powershell -ExecutionPolicy Bypass -File "fix-resume-builder.ps1"`
# CVKonnekt - Resume Builder for South Africans

A professional resume/CV builder designed specifically for South African job seekers.

## Features

- Multiple professional resume templates
- Step-by-step resume building process
- Mobile-friendly design
- Export to PDF
- No account required - all data is stored locally in your browser

## Technologies Used

- HTML5/CSS3
- JavaScript
- React
- Node.js

## Local Development

To run this project locally:

1. Clone the repository
   ```bash
   git clone https://github.com/Londi12/cvkonnekt.git
   ```

2. Navigate to the project directory
   ```bash
   cd cvkonnekt
   ```

3. Start the local server
   ```bash
   node server.js
   ```

4. Open your browser and visit http://localhost:8080

## Azure Deployment

This project is deployed on Azure App Service. The deployment includes:

- Custom server configurations for Azure
- Health check endpoints
- Environment-specific settings

## License

ISC

## Contact

For questions or support, please create an issue in this repository.
