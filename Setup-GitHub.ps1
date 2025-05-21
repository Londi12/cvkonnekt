# GitHub Repository Initialization Script
Write-Host "Setting up GitHub repository for CVKonnekt..." -ForegroundColor Cyan

# Add content to README.md
Add-Content -Path "README.md" -Value "# CVKonnekt" -Force

# Initialize Git repository if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Green
    git init
} else {
    Write-Host "Git repository already initialized" -ForegroundColor Yellow
}

# Add README.md to staging
Write-Host "Adding README.md to staging..." -ForegroundColor Green
git add README.md

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "first commit"

# Set main as the default branch
Write-Host "Setting main as the default branch..." -ForegroundColor Green
git branch -M main

# Add remote repository
Write-Host "Adding remote repository..." -ForegroundColor Green
git remote add origin https://github.com/Londi12/cvkonnekt.git

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "GitHub repository setup complete!" -ForegroundColor Cyan
