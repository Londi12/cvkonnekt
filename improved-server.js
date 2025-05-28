require('dotenv').config();
const express = require('express');
const path = require('path');

// Create Express app
const app = express();

// Basic CORS and security middleware
app.use((req, res, next) => {
    const isDev = process.env.NODE_ENV !== 'production';
    // In dev, allow requests from Vite dev server
    res.setHeader('Access-Control-Allow-Origin', isDev ? 'http://localhost:3002' : '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});

// Parse JSON requests
app.use(express.json());

// Basic request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// API routes
app.get('/api/resume', (req, res) => {
    res.json({ message: 'Resume API is working' });
});

app.post('/api/donate', (req, res) => {
    console.log('Processing donation request');
    try {
        const donation = req.body;
        console.log('Donation received:', donation);
        res.status(200).json({ 
            success: true, 
            message: 'Thank you for your donation!',
            transactionId: 'mock-' + Math.random().toString(36).substring(2, 15)
        });
    } catch (error) {
        console.error('Error processing donation:', error);
        res.status(400).json({ success: false, message: 'Invalid donation data' });
    }
});

// Azure health check endpoint
app.get('/robots933456.txt', (req, res) => {
    console.log('Responding to Azure health check request');
    res.type('text/plain').send('Health check OK');
});

// Only serve static files in production
if (process.env.NODE_ENV === 'production') {
    const buildDir = path.join(__dirname, 'dist');

    // Check if dist directory exists
    if (!require('fs').existsSync(buildDir)) {
        console.warn('Warning: dist directory not found. Please build the project first.');
        // Create dist directory and add a temporary index.html
        require('fs').mkdirSync(buildDir, { recursive: true });
        require('fs').writeFileSync(
            path.join(buildDir, 'index.html'),
            `<!DOCTYPE html>
            <html>
            <head><title>Resume Builder</title></head>
            <body>
                <h1>Server is running</h1>
                <p>The server is working, but the frontend assets haven't been built yet.</p>
                <p>Please build the project first using npm run build.</p>
            </body>
            </html>`
        );
    }

    // Serve static files with proper error handling
    app.use(express.static(buildDir));

    // Serve index.html for client-side routing
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildDir, 'index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server with fallback ports
const tryPort = (port) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port)
            .on('listening', () => {
                console.log(`Server is running on port ${port}`);
                resolve(server);
            })
            .on('error', (error) => {
                if (error.code === 'EADDRINUSE') {
                    console.log(`Port ${port} is in use, trying next port...`);
                    server.close();
                    resolve(false);
                } else {
                    reject(error);
                }
            });
    });
};

const startServer = async () => {
    const isDev = process.env.NODE_ENV !== 'production';
    // In development, always try port 3001 first for the API server
    const ports = isDev ? [3001] : [3001, 3002, 3003, 8080, 8081];
    
    for (const port of ports) {
        const server = await tryPort(port);
        if (server) {
            if (isDev) {
                console.log('\nDevelopment mode:');
                console.log('- API server running on http://localhost:3001');
                console.log('- Frontend dev server should be started separately using "npm run client"');
                console.log('  and will be available at http://localhost:3002\n');
            }
            return;
        }
    }
    console.error('All ports are in use. Please free up one of these ports:', ports.join(', '));
    process.exit(1);
};

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
