// Shared application configuration
module.exports = {
    env: process.env.NODE_ENV || 'development',
    buildDir: process.env.BUILD_DIR || 'dist',
    maxFileSize: process.env.MAX_FILE_SIZE || '5mb',
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
};
