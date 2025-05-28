const winston = require('winston');
const { DefaultAzureCredential } = require('@azure/identity');
const { BlobServiceClient } = require('@azure/storage-blob');
const azureConfig = require('../config/azure');

// Configure Winston logger with Azure App Insights if available
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// If in Azure, add Application Insights
if (azureConfig.isAzure && azureConfig.appInsightsKey) {
    logger.info('Configuring Azure Application Insights');
    // App Insights configuration would go here
}

// Azure Storage utility functions
const getStorageClient = async () => {
    try {
        if (azureConfig.isAzure) {
            // Use managed identity in Azure
            const credential = new DefaultAzureCredential();
            return BlobServiceClient.fromConnectionString(azureConfig.storageConnectionString);
        } else {
            // Use connection string locally
            return BlobServiceClient.fromConnectionString(azureConfig.storageConnectionString);
        }
    } catch (error) {
        logger.error('Failed to create storage client:', error);
        throw error;
    }
};

// Error handling utility
const handleError = (error, req, res, next) => {
    logger.error('Error:', error);
    
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.errors
        });
    }

    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access'
        });
    }

    // Default error
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};

module.exports = {
    logger,
    getStorageClient,
    handleError
};
