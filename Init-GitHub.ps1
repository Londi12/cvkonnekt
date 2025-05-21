# Initialize GitHub repository and push first commit
$ProjectPath = "c:\Users\Londi\Desktop\projects\resumebuilder"
Set-Location $ProjectPath

# Update README with project heading
"# cvkonnekt" | Out-File -FilePath README.md -Append

# Initialize git repository if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Green
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

# Rename the default branch to main
Write-Host "Setting main as the default branch..." -ForegroundColor Green
git branch -M main

# Add the remote repository
Write-Host "Adding remote GitHub repository..." -ForegroundColor Green
git remote add origin https://github.com/Londi12/cvkonnekt.git

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host "If prompted, use your GitHub personal access token instead of password" -ForegroundColor Yellow
git push -u origin main

Write-Host "GitHub setup complete!" -ForegroundColor Green
