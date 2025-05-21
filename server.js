const http = require('http');
const fs = require('fs');
const path = require('path');

// Log environment for troubleshooting
const isAzure = process.env.WEBSITE_SITE_NAME ? true : false;
console.log('Starting server with environment:');
console.log('- isAzure:', isAzure);
console.log('- process.env.PORT:', process.env.PORT);
console.log('- process.env.WEBSITE_PORT:', process.env.WEBSITE_PORT);
console.log('- process.env.HTTP_PLATFORM_PORT:', process.env.HTTP_PLATFORM_PORT);
console.log('- process.env.WEBSITE_SITE_NAME:', process.env.WEBSITE_SITE_NAME);

// Use port from environment variable for Azure, or 8080 locally
const PORT = process.env.PORT || process.env.WEBSITE_PORT || process.env.HTTP_PLATFORM_PORT || 8080;
console.log('Selected PORT:', PORT);

// Handle process errors
process.on('uncaughtException', function(err) {
    console.error('Uncaught Exception:', err);
});

// Exit process on unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Create server
const server = http.createServer((req, res) => {
    // Log requests
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    // Special handling for Azure's health check
    if (req.url === '/robots933456.txt') {
        console.log('Responding to Azure health check request');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Health check OK');
        return;
    }
      // Handle OPTIONS requests for CORS
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }
    
    // Handle donation API endpoint (mock)
    if (req.url === '/api/donate' && req.method === 'POST') {
        console.log('Processing donation request');
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const donation = JSON.parse(body);
                console.log('Donation received:', donation);
                
                // In a real app, this would connect to a payment processor
                // For now, we'll just acknowledge the donation
                res.writeHead(200, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ 
                    success: true, 
                    message: 'Thank you for your donation!',
                    transactionId: 'mock-' + Math.random().toString(36).substring(2, 15)
                }));
            } catch (error) {
                console.error('Error processing donation:', error);
                res.writeHead(400, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ success: false, message: 'Invalid donation data' }));
            }
        });
        
        return;
    }

    // Handle favicon.ico requests
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.slice(1));

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
                    if (err) {
                        // We can't even serve index.html
                        res.writeHead(500);
                        res.end(`Server Error: ${err.code}`);
                    } else {
                        // Serve index.html for any route not found
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {            // Success - add CORS and cache-busting headers
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            });
            res.end(content, 'utf-8');
        }
    });
});

// Function to try starting the server with a given port
function tryStartServer(port) {
    console.log(`Attempting to start server on port ${port}...`);
    
    // Handle server errors
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Error: Port ${port} is already in use`);
            console.log('Trying a different port...');
            // Try a different port
            const nextPort = parseInt(port) + 1;
            console.log(`Will try port ${nextPort} instead`);
            setTimeout(() => {
                server.removeAllListeners('error');
                server.removeAllListeners('listening');
                tryStartServer(nextPort);
            }, 1000);
        } else {
            console.error('Server error:', err);
            // Don't exit in Azure environment
            if (!process.env.WEBSITE_SITE_NAME) {
                process.exit(1);
            }
        }
    });

    // Start server
    server.listen(port, '0.0.0.0', () => {
        console.log('');
        console.log('✓ Resume Builder Server started successfully!');
        console.log(`➜ Server running on: http://0.0.0.0:${port}`);
        console.log(`➜ Directory: ${__dirname}`);
        
        console.log('➜ Files available:');
        fs.readdir(__dirname, (err, files) => {
            if (!err) {
                files.forEach(file => console.log('  -', file));
            }
        });
        
        if (!process.env.WEBSITE_SITE_NAME) {
            console.log('\nPress Ctrl+C to stop the server');
        }
    });
}

// Start the server
tryStartServer(PORT);
