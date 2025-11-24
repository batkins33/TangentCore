# Tangent Forge Utilities

A professional Google Workspace Add-on with a monolith architecture containing multiple utility modules.

**Version:** 2.0.0-alpha  
**Compatible with:** Sheets, Docs, Slides, Forms  
**Enterprise Ready:** Includes Shared Drive support

## 🏗️ Architecture

This project uses a **Monolith Architecture** where one add-on contains multiple modules:

- **Cleanup Module**: Shared Drive Cleaner (Active)
- **Brand Module**: Brand management tools (Coming Soon)
- **Workflow Module**: Automation utilities (Coming Soon)

## 📁 Project Structure

```
tangent-forge-utilities/
├── Code.gs              # Main entry point with routing
├── TangentCore.gs       # Shared library (licensing, logging, Drive iterator)
├── CleanerModule.gs     # Shared Drive Cleaner logic
├── Sidebar.html         # Modern dark-themed UI
└── appsscript.json      # Manifest with Drive API enabled
```

## 🚀 Key Features

### TangentCore Library

- **`checkLicense(email)`**: Mock license verification (returns FREE tier)
- **`logActivity(user, tool, action)`**: Structured activity logging
- **`driveIterator(query, token, batchSize)`**: **CRITICAL** - Robust pagination handler that prevents 6-minute timeout issues

### Cleanup Module (v2)

- **Full Drive access** for "Shared with Me" files (preparing for deletion features)
- **Shared Drive support** - scans Team Drive files
- **500-file hard cap** for speed in alpha version
- **Enhanced file detection** - Excel, Word, PowerPoint, CSV support
- Returns analytics:
  - Total file count
  - Total size in MB
  - File type breakdown (PDF, Sheets, Docs, Images, Excel, Word, PowerPoint, etc.)

### UI Design

- **Tangent Forge Brand v1.2**
  - Background: `#2B2D31` (Forge Charcoal)
  - Accent: `#d96704` (Forge Orange)
  - Monogram Background: `#282828` (lifted from primary bg for contrast)
  - Secondary text: `#A8A8A8` (Smoked Gray)
  - Font: Inter (mid-tier fallback)
- **Tabbed Navigation**: CLEANUP (active), BRAND (disabled), WORKFLOW (disabled)
  - Professional tab labels with Lucide SVG icons
  - Official TF brand header with Inter font
- **Hero Metrics**: Large, monospaced display of GB found
- **Viral Hook**: "Found junk? Share this tool with a Project Manager"
- **Layout**: 24px baseline grid, 16px card radius (TF standards)

## 🔧 Setup Instructions

### Logo Asset Hosting

For Google Workspace Add-ons and other integrations requiring hosted image URLs:

#### Option A: jsDelivr CDN (Recommended)
Zero config — works immediately once assets are committed to repo.

```
https://cdn.jsdelivr.net/gh/tangent-forge/[repo-name]/assets/icon-toolbar.png
https://cdn.jsdelivr.net/gh/tangent-forge/[repo-name]/assets/logo-full.svg
```

**Benefits:**
- No GitHub Pages setup required
- Proper `Content-Type` headers (unlike raw.githubusercontent.com)
- Global CDN with caching
- Version pinning available: `@main`, `@v1.0.0`, or `@[commit-sha]`

#### Option B: GitHub Pages
If you need custom domain or more control:

1. Enable Pages in repo Settings → Pages → Branch: `main` / `root`
2. Assets available at: `https://[org].github.io/[repo]/assets/icon.png`
3. Allow 1-5 min propagation after enabling

#### Why Not Raw GitHub?
`raw.githubusercontent.com` sends `X-Content-Type-Options: nosniff` headers that block image rendering in Google Workspace manifests and some browsers.

#### Asset Naming Convention
```
assets/
├── icon-toolbar.png      # 96x96 PNG (required for Workspace Add-ons)
├── icon-toolbar-48.png   # 48x48 PNG (standard density)
├── logo-full.svg         # Full wordmark for sidebars/headers
└── monogram.svg          # TF mark only (scalable)
```

### Installation Steps

1. **Create a new Google Apps Script project**:
   - Go to [script.google.com](https://script.google.com)
   - Create a new project named "Tangent Forge Utilities"

2. **Copy the files**:
   - Create `Code.gs`, `TangentCore.gs`, `CleanerModule.gs`
   - Create `Sidebar.html`
   - Replace `appsscript.json` with the provided manifest

3. **Enable Drive API**:
   - In the Apps Script editor, go to Services (+ icon)
   - Add "Google Drive API" (v3)

4. **Deploy**:
   - For testing: Run `onOpen()` from any Google Sheet
   - For production: Deploy as an add-on via Google Workspace Marketplace

## 📊 Usage

1. Open any **Google Sheet, Doc, Slide, or Form**
2. Click **Add-ons** (or **Extensions**) → **Tangent Forge** → **Open Utilities**
3. In the sidebar, navigate to **CLEANUP** tab
4. Click **"Scan Shared Junk"** button
5. View results showing total GB and file breakdown (includes Shared Drive files)

## 🔐 OAuth Scopes

**⚠️ v2 Permission Changes** - Upgraded for future deletion functionality:

- `drive` - **Full Drive access** (read, write, delete) - Required for cleanup features
- `userinfo.email` - User identity for license validation
- `script.container.ui` - Display sidebar UI

> **Note:** Users upgrading from v1 will need to re-authorize with the new permissions.

## 🎯 Alpha Version Limitations

- **500-file cap**: Ensures fast scanning for initial testing
- **Scan-only**: Deletion functionality coming in future release
- **Single module active**: Only Cleanup module is functional

## 🗺️ Roadmap

### Phase 1 ✅ Complete (v1.0.0-alpha)
- ✅ Core architecture with TangentCore
- ✅ Drive iterator with timeout protection
- ✅ Shared Drive Cleaner (read-only)
- ✅ Industrial dark mode UI

### Phase 1.5 ✅ Complete (v2.0.0-alpha)
- ✅ Multi-app support (Sheets, Docs, Slides, Forms)
- ✅ Shared Drive (Team Drive) scanning
- ✅ Enhanced file type detection (Microsoft formats)
- ✅ Full Drive permissions for future cleanup
- ✅ TF brand alignment with official assets
- 🎯 **Next**: Implement deletion/cleanup functionality

### Phase 2 (Bluebeam Bridge)
- 📋 Google Cloud Run container (Python + DocTR/PyPDF2)
- 📋 PDF processing for large files
- 📋 Apps Script → Cloud Run integration

## 💡 Design Philosophy

- **Dopamine-driven UX**: Large metrics, satisfying animations
- **Viral mechanics**: Built-in sharing prompts
- **Safety first**: Read-only operations in alpha
- **Scalable architecture**: Modular design for easy expansion

## 🤖 For AI Coding Assistants

This repository includes comprehensive instructions for AI coding assistants.

**Before generating code, AI agents should:**
- Read [`.ai/PROJECT_CONTEXT.md`](.ai/PROJECT_CONTEXT.md) - Complete project context
- Follow established patterns (revealing module, central router, drive iterator)
- Respect alpha constraints (read-only operations, 500-file limit)
- Return standardized responses: `{ success: true/false, data/error }`

**For developers using AI tools:**
- **Cursor IDE**: Uses `.cursorrules` → symlinked to `.ai/PROJECT_CONTEXT.md`
- **GitHub Copilot**: Uses `.github/copilot-instructions.md` → symlinked to `.ai/PROJECT_CONTEXT.md`
- **ChatGPT/Claude**: Paste [`.ai/PROJECT_CONTEXT.md`](.ai/PROJECT_CONTEXT.md) for project context
- **Codebase Audit**: Use [`.ai/AUDIT_PROMPT.md`](.ai/AUDIT_PROMPT.md) template for comprehensive analysis

**Additional resources:**
- [Documentation Standards](.ai/DOCUMENTATION_STANDARDS.md) - Best practices and templates
- [Repo Hygiene Checklist](.ai/REPO_HYGIENE_CHECKLIST.md) - Maintenance guidelines
- [AI Instructions Overview](.ai/README.md) - Complete guide to `.ai/` directory

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[User Guide](docs/USER_GUIDE.md)** - End-user documentation
- **[API Reference](docs/API.md)** - Complete API documentation
- **[Technical Architecture](docs/TECHNICAL.md)** - System design and patterns
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Brand Guidelines](BRAND_GUIDELINES.md)** - Design system and standards

## 📝 Notes

- The `driveIterator` function is **critical** for preventing timeout issues
- All modules use the central `route()` function for action handling
- License checking is currently mocked but ready for backend integration

---

**Built with ❤️ for productivity and efficiency**
