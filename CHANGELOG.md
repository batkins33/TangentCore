# Changelog

All notable changes to TangentCore will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [2.0.0-alpha] - 2025-11-23

### 🚀 Major Changes

#### Multi-Application Support ("Monolith" Architecture)
- **Cross-App Compatibility** - TangentCore now runs in Sheets, Docs, Slides, and Forms
  - Added `getTangentUi_()` helper that detects active application context
  - Replaced hardcoded `SpreadsheetApp.getUi()` with dynamic detection
  - Single deployment works across entire Google Workspace suite
  - Impact: Users can access utilities from any Workspace application

#### Shared Drive (Team Drive) Support
- **Enterprise-Ready Scanning** - Now includes Shared Drives in file scans
  - Added `includeItemsFromAllDrives: true` to Drive API calls
  - Added `supportsAllDrives: true` for team drive compatibility
  - Impact: Previously invisible shared drive files now included in scans

#### Enhanced File Type Detection
- **Microsoft Format Support** - Improved categorization of file types
  - Added detection for Excel files (.xlsx, .xls)
  - Added detection for Word documents (.docx, .doc)
  - Added detection for PowerPoint files (.pptx, .ppt)
  - Added detection for CSV files
  - Impact: More accurate file type breakdowns in analytics

### ⚠️ Breaking Changes

#### Permission Escalation
- **OAuth Scope Change** - Upgraded from read-only to full Drive access
  - Changed: `drive.readonly` → `drive` (full access)
  - Added: `userinfo.email` scope for license validation
  - Removed: `spreadsheets.currentonly` (no longer needed)
  - **Reason**: Required for future deletion/cleanup functionality
  - **Impact**: Users will see new OAuth consent screen requesting higher permissions
  - **Migration**: Users must re-authorize the add-on with new permissions

### 🎨 UI Improvements

#### Brand Alignment
- **Official TF Brand Header** - Integrated complete TF utility block
  - Added TF monogram logo (from `docs/assets/TF_utility_block-2.svg`)
  - Updated font to Inter (TF mid-tier brand standard)
  - Added "TANGENT FORGE UTILITIES" branded header

#### Tab Renaming for Clarity
- **Professional Labels** - Renamed tabs for better user understanding
  - `JANITOR` → `CLEANUP` (clearer purpose)
  - `BRAND` → `BRAND` (unchanged)
  - `SITE OPS` → `WORKFLOW` (more descriptive)
  - Updated workflow icon from `hard-hat` to `workflow`

#### Button Refinements
- **Sophisticated Gradient** - Reversed button gradient for premium feel
  - Base: Dark orange `#B85503` → Forge Orange `#D96704`
  - Hover: Forge Orange `#D96704` → Bright `#FF8C1A`
  - Impact: More grounded, professional appearance

#### Visual Fix
- **Layout Correction** - Fixed viral link display alignment
  - Changed display from `block` to `flex` for proper icon/text alignment

### 🔧 Technical Improvements

#### Code Quality
- **Auto-formatted Codebase** - Applied Prettier formatting
  - Consistent quote style (double quotes)
  - Standardized spacing and indentation
  - Impact: Better maintainability and readability

#### Logging Enhancement
- **Improved Activity Logging** - Better structured console logs
  - ISO timestamp format
  - Clear user/tool/action separation
  - Impact: Easier debugging and monitoring

### 📚 Documentation
- Updated README.md to reflect multi-app support
- Updated SECURITY.md with new OAuth scopes
- Enhanced CHANGELOG with comprehensive v2 changes
- Updated all API documentation for new capabilities

### ⚙️ Configuration Changes
- Updated `appsscript.json` with new OAuth scopes
- Maintained Drive API v3 dependency
- Kept V8 runtime for modern JavaScript support

---

## [1.0.0-alpha] - 2025-01-15 (Original Release)

### Added
- Comprehensive AI agent instructions in `.ai/` directory
  - PROJECT_CONTEXT.md - Complete project context for AI coding assistants
  - AUDIT_PROMPT.md - Universal codebase audit template
  - DOCUMENTATION_STANDARDS.md - Best-in-class documentation standards
  - REPO_HYGIENE_CHECKLIST.md - Comprehensive maintenance checklist
  - README.md - Guide to AI instructions
- Symlinks for AI tool integration
  - `.cursorrules` → `.ai/PROJECT_CONTEXT.md` (Cursor IDE)
  - `.github/copilot-instructions.md` → `.ai/PROJECT_CONTEXT.md` (GitHub Copilot)
- GitHub issue templates (bug report, feature request, documentation)
- GitHub pull request template with comprehensive checklists
- SECURITY.md - Security policy and vulnerability reporting
- .editorconfig - Consistent code formatting across editors
- .gitattributes - Proper line ending handling
- AI coding assistant section in README.md
- AI assistant guidelines in CONTRIBUTING.md

### Changed
- Enhanced README.md with AI instructions and documentation links
- Updated CONTRIBUTING.md with AI context and code review guidelines

---

## [1.0.0-alpha] - 2025-01-15

### Added
- **TangentCore Library** - Shared utilities for all modules
  - `checkLicense(email)` - License verification system (mocked)
  - `logActivity(user, tool, action)` - Structured activity logging
  - `driveIterator(query, token, batchSize)` - Pagination handler to prevent timeouts
  - `bytesToMB(bytes)` - File size conversion utility
  - `categorizeFileType(mimeType)` - File type categorization
- **Janitor Module** (Shared Drive Cleaner) - Alpha version
  - Read-only scanning of "Shared with Me" files
  - 500-file hard cap for safety
  - File analytics (count, size, type breakdown)
- **Modern UI** with Tangent Forge brand v1.2
  - Dark theme with Forge Charcoal background (#2B2D31)
  - Forge Orange accents (#D96704)
  - Tabbed navigation (Janitor, Brand, Site Ops)
  - Hero metrics display
  - Responsive design with 24px baseline grid
- **Documentation**
  - README.md - Project overview and quick start
  - docs/API.md - Complete API reference
  - docs/USER_GUIDE.md - End-user documentation
  - docs/TECHNICAL.md - Technical architecture
  - CONTRIBUTING.md - Contribution guidelines
  - BRAND_GUIDELINES.md - Design system v1.2
  - DESIGN_ACTION_PLAN.md - Color strategy and implementation
  - COLOR_PALETTE_EXTENDED.md - Context-aware color system
- **Architecture**
  - Monolith architecture with modular design
  - Central router pattern via `route()` function
  - Revealing module pattern for all modules
  - Google Apps Script with V8 runtime
  - Drive API v3 integration

### Security
- Read-only operations only (no file modification/deletion)
- Minimal OAuth scopes (drive.readonly, spreadsheets.currentonly, script.container.ui)
- No data storage (all processing in-memory)
- No file content access (metadata only)
- Activity logging for transparency

### Known Limitations
- Alpha version limited to 500 files
- Only Janitor module functional
- License system is mocked (backend integration pending)
- No automated tests

---

## Version History

[Unreleased]: https://github.com/batkins33/TangentCore/compare/v1.0.0-alpha...HEAD
[1.0.0-alpha]: https://github.com/batkins33/TangentCore/releases/tag/v1.0.0-alpha
