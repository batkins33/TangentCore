# TangentCore Setup Script
# Copies files from scratch directory to TangentCore and initializes Git repository

Write-Host "🚀 Setting up TangentCore project..." -ForegroundColor Cyan

# Define paths
$sourceDir = "C:\Users\brian.atkins\.gemini\antigravity\scratch\tangent-forge-utilities"
$targetDir = "U:\TANGENT_FORGE\4_UTILITIES\Workspace_Apps\TangentCore"

# Step 1: Copy all files
Write-Host "`n📁 Copying files to TangentCore..." -ForegroundColor Yellow
Copy-Item -Path "$sourceDir\*" -Destination $targetDir -Recurse -Force
Write-Host "✓ Files copied successfully" -ForegroundColor Green

# Step 2: Navigate to target directory
Set-Location $targetDir

# Step 3: Create .gitignore
Write-Host "`n📝 Creating .gitignore..." -ForegroundColor Yellow
$gitignoreContent = @"
# Node modules (if using any build tools)
node_modules/
package-lock.json

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db
desktop.ini

# Logs
*.log
logs/

# Temporary files
*.tmp
temp/
.temp/

# Environment files
.env
.env.local

# Build outputs (if applicable)
dist/
build/

# Google Apps Script specific
.clasp.json
.claspignore
"@

Set-Content -Path ".gitignore" -Value $gitignoreContent
Write-Host "✓ .gitignore created" -ForegroundColor Green

# Step 4: Initialize Git repository
Write-Host "`n🔧 Initializing Git repository..." -ForegroundColor Yellow
git init
Write-Host "✓ Git repository initialized" -ForegroundColor Green

# Step 5: Configure Git (optional - update with your details)
Write-Host "`n⚙️ Configuring Git..." -ForegroundColor Yellow
git config user.name "Brian Atkins"
git config user.email "brian.atkins@tangentforge.com"
Write-Host "✓ Git configured" -ForegroundColor Green

# Step 6: Add all files
Write-Host "`n📦 Staging files..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files staged" -ForegroundColor Green

# Step 7: Create initial commit
Write-Host "`n💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Tangent Forge Utilities v1.0

- Google Apps Script add-on for workspace utilities
- Shared Drive Cleaner module (alpha)
- TangentCore library with Drive iterator
- Brand-aligned UI (Anvil Blue + Forge Orange)
- Complete brand guidelines and design documentation
- Example implementations for PathFinder and Utilities contexts"

Write-Host "✓ Initial commit created" -ForegroundColor Green

# Step 8: Display status
Write-Host "`n📊 Repository status:" -ForegroundColor Cyan
git status

# Step 9: Show file structure
Write-Host "`n📂 Project structure:" -ForegroundColor Cyan
Get-ChildItem -Recurse -Depth 1 | Select-Object Mode, Name | Format-Table -AutoSize

Write-Host "`n✅ TangentCore setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Review the files in: $targetDir"
Write-Host "  2. Create GitHub repository (if needed)"
Write-Host "  3. Add remote: git remote add origin <repository-url>"
Write-Host "  4. Push to GitHub: git push -u origin main"
Write-Host ""
