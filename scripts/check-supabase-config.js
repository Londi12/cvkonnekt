const fs = require('fs');
const path = require('path');

// Check if .env file exists
const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.warn('Warning: .env file not found. Make sure environment variables are set in your deployment platform.');
  process.exit(0); // Exit with success to allow build to continue
}

// Check if required environment variables are set
const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn(`Warning: Missing environment variables: ${missingVars.join(', ')}`);
  console.warn('Make sure these variables are set in your deployment platform.');
  process.exit(0); // Exit with success to allow build to continue
}

console.log('Supabase configuration check passed.');
process.exit(0); 