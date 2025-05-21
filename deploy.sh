#!/bin/bash

# ----------------------
# KUDU Deployment Script for Azure App Service
# ----------------------

echo "Starting deployment script for CVKonnekt"

# Check for DEPLOYMENT_TARGET environment variable
if [ -z "$DEPLOYMENT_TARGET" ]; then
  DEPLOYMENT_TARGET="$HOME/site/wwwroot"
fi

echo "Deployment target: $DEPLOYMENT_TARGET"

# Create app_offline.htm during deployment to stop any running processes
if [ -e "$DEPLOYMENT_TARGET" ]; then
  echo "Creating app_offline.htm to pause the application during deployment"
  touch "$DEPLOYMENT_TARGET/app_offline.htm"
fi

# Make sure all npm modules are installed
if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  echo "Found package.json. Running npm install"
  npm install --production --no-optional
  if [ $? -ne 0 ]; then
    echo "npm install failed"
    exit 1
  fi

  # Ensure correct permissions
  echo "Setting execution permissions"
  chmod +x "$DEPLOYMENT_TARGET/startup.sh"
  
  # Create a web.config if it doesn't exist
  if [ ! -e "$DEPLOYMENT_TARGET/web.config" ]; then
    echo "Creating default web.config"
    cp "$DEPLOYMENT_TARGET/web.config.defaults" "$DEPLOYMENT_TARGET/web.config" 2>/dev/null || :
  fi
  
  # Create .env file with port configuration
  echo "Creating .env file with PORT configuration"
  echo "PORT=$PORT" > "$DEPLOYMENT_TARGET/.env"
  
  # Ensure IISNode understands our app
  echo "Ensuring IISNode configuration is correct"
  touch "$DEPLOYMENT_TARGET/iisnode.yml"
  
  echo "Deployment completed successfully"
  cd - > /dev/null
fi

# Remove app_offline.htm to resume the application
echo "Removing app_offline.htm to resume the application"
rm -f "$DEPLOYMENT_TARGET/app_offline.htm"

echo "Deployment script finished successfully"
exit 0
