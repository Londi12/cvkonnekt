#!/bin/bash

# Display environment for debugging
echo "=== Azure App Service Startup Script ==="
echo "Current directory: $(pwd)"
echo "Files in directory:"
ls -la

# Create Azure health check file if it doesn't exist
echo "Setting up Azure health check response"
echo "Health check OK" > robots933456.txt
echo "Created health check file"

# Make sure environment variables are available
if [ -z "$PORT" ] && [ ! -z "$WEBSITE_PORT" ]; then
  export PORT=$WEBSITE_PORT
  echo "Setting PORT=$PORT from WEBSITE_PORT"
fi

# Check if any node processes are already running
echo "Checking for running Node.js processes:"
ps -ef | grep node

# Remove app_offline.htm if it exists to allow the app to run
if [ -f app_offline.htm ]; then
  echo "Removing app_offline.htm to enable the application"
  rm app_offline.htm
fi

# Start the application
echo "Starting application with PORT=$PORT"
node server.js
