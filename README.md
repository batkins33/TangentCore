# Tangent Forge Utilities

A professional Google Workspace Add-on with a monolith architecture containing multiple utility modules.

## 🏗️ Architecture

This project uses a **Monolith Architecture** where one add-on contains multiple modules:

- **Janitor Module**: Shared Drive Cleaner (Active)
- **Brand Module**: Brand management tools (Coming Soon)
- **Site Ops Module**: Site operations utilities (Coming Soon)

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

### Cleaner Module (Alpha)

- **Read-only scanning** of "Shared with Me" files
- **500-file hard cap** for speed in alpha version
- Returns analytics:
  - Total file count
  - Total size in MB
  - File type breakdown (PDF, Sheets, Docs, Images, etc.)

### UI Design

- **Tangent Forge Brand v1.2**
  - Background: `#2B2D31` (Forge Charcoal)
  - Accent: `#D96704` (Forge Orange)
  - Secondary text: `#A8A8A8` (Smoked Gray)
  - Font: Inter (mid-tier fallback)
- **Tabbed Navigation**: Janitor (active), Brand (disabled), Site Ops (disabled)
- **Hero Metrics**: Large, monospaced display of GB found
- **Viral Hook**: "Found junk? Share this tool with a Project Manager"
- **Layout**: 24px baseline grid, 16px card radius (TF standards)

## 🔧 Setup Instructions

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

1. Open any Google Sheet
2. Click **Tangent Forge** → **Open Utilities**
3. In the sidebar, click **"🔍 Scan Shared Junk"**
4. View results showing total GB and file breakdown

## 🔐 OAuth Scopes

- `drive.readonly` - Read-only access to Drive files
- `spreadsheets.currentonly` - Access to current spreadsheet
- `script.container.ui` - Display sidebar UI

## 🎯 Alpha Version Limitations

- **500-file cap**: Ensures fast scanning for initial testing
- **Read-only**: No deletion functionality (safety first)
- **Single module active**: Only Janitor module is functional

## 🗺️ Roadmap

### Phase 1 (Current - Alpha)
- ✅ Core architecture with TangentCore
- ✅ Drive iterator with timeout protection
- ✅ Shared Drive Cleaner (read-only)
- ✅ Industrial dark mode UI
- 🎯 **Next**: Submit to Google for Publisher ID approval

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
