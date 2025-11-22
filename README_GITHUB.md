# TangentCore - Workspace Utilities

<div align="center">

![Tangent Forge](https://img.shields.io/badge/Tangent_Forge-Utilities-D96704?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0--alpha-1098AD?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-2B2D31?style=for-the-badge)

**Professional Google Workspace Add-on for productivity and workspace management**

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

**TangentCore** is a Google Workspace Add-on built with a monolith architecture, containing multiple utility modules designed to enhance productivity and workspace management. Currently in **Alpha**, it features the Shared Drive Cleaner module with more tools coming soon.

### Current Status: Alpha v1.0

- ✅ **Janitor Module**: Shared Drive Cleaner (Active)
- 🚧 **Brand Module**: Brand asset management (Coming Soon)
- 🚧 **Site Ops Module**: Site operations utilities (Coming Soon)

---

## ✨ Features

### 🗑️ Shared Drive Cleaner (Active)

- **Read-only scanning** of "Shared with Me" files
- **500-file cap** for fast alpha testing
- **Detailed analytics**:
  - Total file count
  - Total storage (MB/GB)
  - File type breakdown (PDF, Sheets, Docs, Images, etc.)
- **Modern UI** with Tangent Forge brand design

### 🔧 TangentCore Library

- **License management** (mock implementation, ready for backend)
- **Activity logging** with structured JSON output
- **Drive Iterator** - Critical pagination handler that prevents 6-minute timeout issues
- **Helper utilities** for file categorization and size conversion

---

## 🚀 Installation

### Prerequisites

- Google Workspace account
- Access to Google Apps Script
- Drive API v3 enabled

### Setup Steps

1. **Create a new Google Apps Script project**:
   ```
   Go to: https://script.google.com
   Click: New Project
   Name: "Tangent Forge Utilities"
   ```

2. **Copy the project files**:
   - `Code.gs` - Main entry point
   - `TangentCore.gs` - Shared library
   - `CleanerModule.gs` - Cleaner logic
   - `Sidebar.html` - UI interface
   - `appsscript.json` - Manifest

3. **Enable Drive API**:
   ```
   In Apps Script editor:
   Services → + Add a service → Google Drive API (v3)
   ```

4. **Deploy**:
   - **For testing**: Run `onOpen()` from any Google Sheet
   - **For production**: Deploy as add-on via Google Workspace Marketplace

### OAuth Scopes Required

```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets.currentonly",
    "https://www.googleapis.com/auth/script.container.ui"
  ]
}
```

---

## 📚 Documentation

### For Users
- [User Guide](docs/USER_GUIDE.md) - How to use TangentCore
- [FAQ](docs/FAQ.md) - Common questions and troubleshooting

### For Developers
- [Technical Documentation](docs/TECHNICAL.md) - Architecture and implementation
- [API Reference](docs/API.md) - Function signatures and usage
- [Brand Guidelines](BRAND_GUIDELINES.md) - Design standards
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

### Design Resources
- [Design Action Plan](DESIGN_ACTION_PLAN.md) - Color usage and component patterns
- [Color Palette](COLOR_PALETTE_EXTENDED.md) - Extended color system
- [Quick Reference](QUICK_REFERENCE.md) - At-a-glance design rules
- [Examples](examples/) - Working HTML implementations

---

## 🏗️ Architecture

### Monolith Structure

```
TangentCore/
├── Code.gs              # Entry point, routing, menu
├── TangentCore.gs       # Shared library (licensing, logging, Drive iterator)
├── CleanerModule.gs     # Shared Drive Cleaner logic
├── Sidebar.html         # Modern UI interface
├── appsscript.json      # Manifest with Drive API
└── docs/                # Documentation
```

### Key Components

#### 1. Central Router (`Code.gs`)
- `onOpen(e)` - Creates menu
- `onHomepage(e)` - Opens sidebar
- `route(action, payload)` - Handles all UI actions

#### 2. TangentCore Library (`TangentCore.gs`)
- `checkLicense(email)` - License verification
- `logActivity(user, tool, action)` - Structured logging
- **`driveIterator(query, token, batchSize)`** - Critical pagination handler

#### 3. Cleaner Module (`CleanerModule.gs`)
- `scanSharedFiles()` - Read-only scan with 500-file cap
- Returns: `{ totalCount, totalSizeMB, fileTypes }`

---

## 🎨 Design Philosophy

TangentCore follows **Tangent Forge v1.2 Brand Guidelines**:

### Color System
- **Foundation**: Forge Charcoal (`#2B2D31`) - 60%
- **Content**: White/Smoked Gray - 30%
- **Interaction**: Anvil Blue (`#1098AD`) - 10%
- **Action Spark**: Forge Orange (`#D96704`) - 5%

### Core Principles
> **"Forge Orange is the spark, not the screen."**

- **Clarity + Utility** - Minimal noise, focused layouts
- **Form Follows Clarity** - Distill complexity, remove friction
- **Intentionality** - Every element has purpose

See [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) for complete specifications.

---

## 🔐 Security & Privacy

- **Read-only access** - No file deletion in alpha
- **OAuth 2.0** - Secure Google authentication
- **Minimal scopes** - Only requests necessary permissions
- **No data storage** - All processing happens in-session
- **Transparent logging** - Activity logs for audit trail

---

## 🗺️ Roadmap

### Phase 1: Alpha (Current)
- ✅ Core architecture with TangentCore
- ✅ Drive iterator with timeout protection
- ✅ Shared Drive Cleaner (read-only)
- ✅ Brand-aligned UI
- 🎯 **Next**: Submit to Google for Publisher ID approval

### Phase 2: Beta
- 📋 File archiving functionality
- 📋 Batch operations
- 📋 Export reports
- 📋 User preferences

### Phase 3: Brand Module
- 📋 Brand asset organization
- 📋 Asset search and tagging
- 📋 Version control

### Phase 4: Site Ops Module
- 📋 Deployment monitoring
- 📋 Task management
- 📋 Workflow automation

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

1. Clone the repository
2. Review [TECHNICAL.md](docs/TECHNICAL.md) for architecture details
3. Follow [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) for design standards
4. Test using Google Apps Script editor
5. Submit pull request

### Code Standards

- **JavaScript**: ES5 (Apps Script compatibility)
- **HTML/CSS**: Modern standards with Tailwind CSS
- **Comments**: JSDoc format for all functions
- **Testing**: Manual testing in Google Sheets

---

## 📊 Project Stats

- **Language**: JavaScript (Google Apps Script)
- **UI Framework**: HTML/CSS with Tailwind
- **API**: Google Drive API v3
- **Architecture**: Monolith with modular design
- **Status**: Alpha v1.0

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **Tangent Forge** - Brand and design system
- **Google Apps Script** - Platform and APIs
- **Tailwind CSS** - UI styling framework

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/tangentforge/tangentcore/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tangentforge/tangentcore/discussions)
- **Email**: support@tangentforge.com

---

<div align="center">

**Built with ❤️ for productivity and efficiency**

[⬆ Back to Top](#tangentcore---workspace-utilities)

</div>
