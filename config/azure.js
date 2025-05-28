// Azure-specific configuration
module.exports = {
    isAzure: process.env.WEBSITE_SITE_NAME ? true : false,
    appServicePort: process.env.PORT || process.env.WEBSITE_PORT || process.env.HTTP_PLATFORM_PORT || 3000,
    storageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    storageContainer: process.env.AZURE_STORAGE_CONTAINER || 'resumes',
    keyVaultName: process.env.KEY_VAULT_NAME,
    appInsightsKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
    appInsightsEndpoint: process.env.APPINSIGHTS_ENDPOINT,
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
};
