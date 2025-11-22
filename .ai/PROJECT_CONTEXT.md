# Project Context for AI Agents

**Version:** 1.0
**Last Updated:** 2025-11-22
**Purpose:** Provide AI agents with comprehensive project understanding

---

## About This File

This file provides context for AI coding assistants (GitHub Copilot, Cursor, Claude, ChatGPT, etc.) to:
- Understand the project's purpose and architecture
- Follow project-specific coding standards
- Make contextually appropriate suggestions
- Avoid common pitfalls and anti-patterns

**Location:** Place this in `.ai/PROJECT_CONTEXT.md` or `.cursorrules`

---

## Project Overview

### What Is This Project?

**Name:** TangentCore
**Type:** Google Apps Script Add-on
**Version:** 1.0.0-alpha
**Status:** Alpha (Read-only operations, safety-limited)

**Purpose:**
TangentCore is a workspace utilities add-on for Google Workspace that provides multiple productivity modules within a single add-on (monolith architecture).

**Target Users:**
- Google Workspace business/enterprise users
- Teams managing shared drives
- Organizations needing workspace utilities

### Current Features

**Active Modules:**
- **Janitor Module** (Shared Drive Cleaner) - Scans shared files and provides analytics

**Coming Soon:**
- Brand Module - Brand asset management
- Site Ops Module - Deployment and workflow automation

---

## Technology Stack

### Runtime Environment
- **Platform:** Google Apps Script
- **JavaScript Version:** ES5 (Apps Script compatibility)
- **Runtime:** V8 Engine
- **API Access:** Google Drive API v3 (Advanced Service)

### Frontend
- **HTML:** HTML5 with HtmlService
- **CSS:** Tailwind CSS (via CDN)
- **JavaScript:** Vanilla JS (no frameworks)
- **Fonts:** Inter (Google Fonts)

### Tools
- **Version Control:** Git
- **Testing:** Manual testing (no automated tests yet)
- **Deployment:** Google Apps Script editor / clasp

---

## Architecture Patterns

### 1. Monolith with Modular Architecture

```
TangentCore Add-on (Single Deployment)
├── TangentCore.gs (Shared Library)
├── Code.gs (Router & Entry Point)
├── CleanerModule.gs (Janitor Module)
├── BrandModule.gs (Future)
└── SiteOpsModule.gs (Future)
```

**Why Monolith:**
- Single deployment and OAuth approval
- Shared code library
- Consistent UI/UX
- Easier maintenance at current scale

### 2. Revealing Module Pattern

**All modules MUST use this pattern:**

```javascript
var ModuleName = (function() {
  // Private variables
  var privateVar = 'private';

  // Private functions
  function privateFunction() {
    // Implementation
  }

  // Public API
  function publicFunction() {
    return privateFunction();
  }

  // Return public interface
  return {
    publicFunction: publicFunction
  };
})();
```

**Why:**
- Encapsulation (no global pollution)
- Clear public API
- Namespace management
- Testability

### 3. Central Router Pattern

**Single entry point for all UI actions:**

```javascript
function route(action, payload) {
  try {
    var user = Session.getActiveUser().getEmail();
    TangentCore.logActivity(user, 'router', action);

    var license = TangentCore.checkLicense(user);
    if (!license.active) {
      return { success: false, error: 'License inactive' };
    }

    switch(action) {
      case 'scanShared':
        return CleanerModule.scanSharedFiles();
      // ... more actions
    }
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}
```

**All actions MUST:**
1. Log activity
2. Check license
3. Return standardized response: `{ success: true/false, data/error }`

---

## Critical Design Decisions

### 1. Drive Iterator (MOST IMPORTANT)

**Location:** `TangentCore.gs` line ~75

**Problem:** Google Apps Script has 6-minute execution timeout. Large Drive queries timeout.

**Solution:** Pagination-based iterator pattern

```javascript
function driveIterator(query, continuationToken, batchSize) {
  var searchParams = {
    q: query,
    pageSize: Math.min(batchSize || 100, 1000),
    fields: 'nextPageToken, files(id, name, mimeType, size, ...)',
    pageToken: continuationToken
  };

  var response = Drive.Files.list(searchParams);

  return {
    files: response.files,              // Current batch
    nextToken: response.nextPageToken,  // Resume token
    hasMore: !!response.nextPageToken,  // More results?
    count: response.files.length        // Batch size
  };
}
```

**AI: When suggesting Drive queries, ALWAYS use `driveIterator()` for resumable operations.**

### 2. Alpha Safety Constraints

**Hard Limits:**
- MAX_FILES = 500 (CleanerModule)
- Read-only operations ONLY
- No file deletion or modification
- No data storage (all in-memory)

**AI: Do NOT suggest removing these limits without explicit approval.**

### 3. Standard Response Format

**ALL functions that interact with UI MUST return:**

```javascript
// Success
return {
  success: true,
  data: { /* actual data */ }
};

// Error
return {
  success: false,
  error: 'User-friendly error message'
};
```

**AI: Never return raw values. Always use this wrapper format.**

---

## Code Style Guidelines

### JavaScript Style (ES5)

**Use ES5 Syntax (No ES6+):**

```javascript
// ✅ CORRECT (ES5)
var myArray = [1, 2, 3];
var doubled = myArray.map(function(n) { return n * 2; });

// ❌ WRONG (ES6)
const myArray = [1, 2, 3];
const doubled = myArray.map(n => n * 2);
```

**Why:** Apps Script V8 supports ES6, but we maintain ES5 for broader compatibility.

### Naming Conventions

```javascript
// Variables and functions: camelCase
var userName = 'John';
function getUserName() { }

// Constants: UPPER_SNAKE_CASE
var MAX_FILES = 500;
var API_VERSION = 'v3';

// Modules: PascalCase
var CleanerModule = (function() { })();
var TangentCore = (function() { })();

// Private functions: prefix with underscore (optional)
function _privateHelper() { }
```

### Indentation & Formatting

- **Indent:** 2 spaces (NO tabs)
- **Line Length:** 80 characters preferred, 100 max
- **Semicolons:** ALWAYS use semicolons
- **Quotes:** Single quotes preferred
- **Braces:** K&R style (opening brace on same line)

```javascript
// ✅ CORRECT
function myFunction() {
  if (condition) {
    doSomething();
  }
}

// ❌ WRONG
function myFunction()
{
  if (condition)
  {
    doSomething()
  }
}
```

---

## Documentation Requirements

### JSDoc Comments (Required for Public Functions)

```javascript
/**
 * Brief one-line description.
 *
 * More detailed description if needed. Explain what the function does,
 * not how it does it (that's what code comments are for).
 *
 * @param {string} param1 - Description of param1
 * @param {number} [param2=10] - Optional param with default
 * @returns {Object} Response object with success and data/error
 * @throws {Error} When parameter is invalid
 *
 * @example
 * var result = myFunction('test', 5);
 * console.log(result.data);
 */
function myFunction(param1, param2) {
  // Implementation
}
```

### Inline Comments (When to Use)

```javascript
// ✅ GOOD: Explain WHY, not WHAT
// Use batch size of 100 to stay under 6-minute timeout
var batchSize = 100;

// ❌ BAD: Obvious what code does
// Set batch size to 100
var batchSize = 100;

// ✅ GOOD: Complex business logic
// Tax calculation uses progressive brackets per 2024 IRS code
var tax = calculateProgressiveTax(income);

// ✅ GOOD: Workarounds and gotchas
// HACK: DriveApp.getFileById() fails on team drives, use Drive API instead
var file = Drive.Files.get(fileId);

// ✅ GOOD: TODOs with context
// TODO: Add rate limiting when we hit 10K users (ticket #123)
```

---

## Error Handling Standards

### Try-Catch Pattern

```javascript
/**
 * Scans shared files and returns analytics.
 */
function scanSharedFiles() {
  try {
    // 1. Validate inputs
    var user = Session.getActiveUser().getEmail();
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // 2. Perform operation
    var files = driveIterator('sharedWithMe', null, 100);

    // 3. Process results
    var analytics = processFiles(files.files);

    // 4. Return success
    return {
      success: true,
      data: analytics
    };

  } catch (error) {
    // Log error for debugging
    console.error('Error in scanSharedFiles:', error);

    // Return user-friendly error
    return {
      success: false,
      error: 'Failed to scan files. Please try again.'
    };
  }
}
```

### Logging

```javascript
// Use TangentCore.logActivity() for user actions
TangentCore.logActivity(user, 'module', 'action', { details: 'data' });

// Use console for debugging
console.log('Debug info:', variable);
console.error('Error occurred:', error);
console.warn('Warning:', message);
```

---

## Testing Guidelines

### Manual Testing (Current)

**Before committing code:**
1. Test in Google Apps Script editor
2. Test all user-facing functions via UI
3. Test error cases (invalid input, API failures)
4. Test with different user accounts
5. Check console for errors/warnings

### Test Scenarios to Verify

```javascript
// Test success case
var result = CleanerModule.scanSharedFiles();
console.assert(result.success === true, 'Scan should succeed');
console.assert(result.data.fileCount > 0, 'Should find files');

// Test error case
var result = CleanerModule.scanSharedFiles();
// (Simulate API error by commenting out try-catch)
console.assert(result.success === false, 'Should handle errors');
console.assert(result.error, 'Should return error message');
```

**AI: When generating code, include test scenarios in comments.**

---

## Security Guidelines

### Authentication

```javascript
// ALWAYS get user from session (OAuth)
var user = Session.getActiveUser().getEmail();

// NEVER hard-code user emails
var user = 'john@example.com'; // ❌ WRONG
```

### Authorization

```javascript
// ALWAYS check license before operations
var license = TangentCore.checkLicense(user);
if (!license.active) {
  return { success: false, error: 'Inactive license' };
}

// Check tier for feature access
if (license.tier === 'free' && requestedFeature === 'premium') {
  return { success: false, error: 'Premium feature' };
}
```

### Data Privacy

```javascript
// ✅ GOOD: Only access metadata
var fileName = file.getName();
var fileSize = file.getSize();

// ❌ BAD: Don't access file contents unless necessary
var content = file.getBlob(); // Only if feature requires it

// ✅ GOOD: No data storage (all in-memory)
var results = processFiles(files);
return results; // Results die after request

// ❌ BAD: Don't store user data
PropertiesService.setUserProperty('files', JSON.stringify(files)); // NO!
```

### Secrets Management

```javascript
// ❌ WRONG: Hard-coded API keys
var apiKey = 'sk-1234567890abcdef';

// ✅ CORRECT: Use Properties Service
var apiKey = PropertiesService.getScriptProperties().getProperty('API_KEY');

// ✅ CORRECT: For development, use .env pattern
var apiKey = PropertiesService.getUserProperties().getProperty('DEV_API_KEY');
```

---

## Performance Best Practices

### Prevent Timeouts

```javascript
// ✅ GOOD: Use pagination
var batch = driveIterator(query, null, 100);
while (batch.hasMore) {
  processFiles(batch.files);
  batch = driveIterator(query, batch.nextToken, 100);
}

// ❌ BAD: Load everything at once
var allFiles = DriveApp.searchFiles('sharedWithMe'); // Timeout risk!
```

### Minimize API Calls

```javascript
// ✅ GOOD: Batch requests
var files = Drive.Files.list({
  q: query,
  pageSize: 100,
  fields: 'files(id, name, size)' // Only fields you need
});

// ❌ BAD: Individual requests
files.forEach(function(file) {
  var details = Drive.Files.get(file.id); // N+1 problem!
});
```

### Efficient Data Structures

```javascript
// ✅ GOOD: Use objects for lookups (O(1))
var fileMap = {};
files.forEach(function(file) {
  fileMap[file.id] = file;
});
var file = fileMap[id]; // Fast lookup

// ❌ BAD: Use arrays for lookups (O(n))
var fileArray = files;
var file = fileArray.find(function(f) { return f.id === id; }); // Slow
```

---

## UI/UX Guidelines

### Design System

**Colors (60/30/10 Rule):**
- **Foundation (60%):** Forge Charcoal `#2B2D31`, Deep Charcoal `#1F1F23`
- **Content (30%):** White `#FFFFFF`, Smoked Gray `#A8A8A8`
- **Interaction (10%):** Anvil Blue `#1098AD` (Educational), Dark Copper `#8B5A3C` (Utility)
- **Action Spark (5%):** Forge Orange `#D96704` (USE SPARINGLY!)

**Key Principle:**
> "Forge Orange is the SPARK, not the SCREEN"

```html
<!-- ✅ GOOD: Orange for small accents -->
<button class="bg-[#D96704] text-white px-4 py-2 rounded">
  Scan Files
</button>

<!-- ❌ BAD: Orange for large areas -->
<div class="bg-[#D96704] w-full h-screen"> <!-- Too much orange! -->
```

### Typography

- **Font:** Inter (Google Fonts)
- **Base Grid:** 24px baseline
- **Border Radius:** 16px for cards, 8px for buttons

### Accessibility

```html
<!-- ✅ GOOD: Accessible markup -->
<button
  aria-label="Scan shared files"
  class="...">
  Scan Files
</button>

<!-- ✅ GOOD: Semantic HTML -->
<main role="main">
  <section aria-labelledby="results-heading">
    <h2 id="results-heading">Scan Results</h2>
  </section>
</main>
```

---

## Common Patterns

### Loading States

```javascript
// UI shows loading indicator
google.script.run
  .withSuccessHandler(function(response) {
    // Hide loading, show results
    document.getElementById('loading').classList.add('hidden');
    displayResults(response.data);
  })
  .withFailureHandler(function(error) {
    // Hide loading, show error
    document.getElementById('loading').classList.add('hidden');
    showError(error.message);
  })
  .route('scanShared');
```

### Tab Navigation

```javascript
function showTab(tabId) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(function(tab) {
    tab.classList.add('hidden');
  });

  // Show selected tab
  document.getElementById(tabId).classList.remove('hidden');

  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(function(btn) {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}
```

---

## What AI Should NOT Do

### Don't Add These Without Approval

❌ TypeScript (Apps Script is JavaScript only)
❌ ES6+ features (arrow functions, const/let, async/await)
❌ External libraries (no npm, must use CDN)
❌ Database storage (no persistence allowed)
❌ File deletion (alpha is read-only)
❌ Modify file limits (MAX_FILES = 500 in alpha)
❌ Remove error handling (always try-catch)
❌ Remove logging (essential for debugging)

### Don't Suggest These Patterns

❌ Global variables (use revealing module pattern)
❌ Synchronous loading for large datasets (use pagination)
❌ Hard-coded configuration (use constants at top of file)
❌ Magic numbers (define as named constants)
❌ Callback hell (keep nesting shallow)

---

## AI Assistant Guidelines

### When Generating Code

1. **Use revealing module pattern** for new modules
2. **Use driveIterator()** for all Drive queries
3. **Return standardized responses** `{ success, data/error }`
4. **Add JSDoc comments** for public functions
5. **Include error handling** (try-catch)
6. **Log important actions** using TangentCore.logActivity()
7. **Respect alpha limits** (500 files, read-only)
8. **Follow ES5 syntax** (no ES6+)
9. **Use 2-space indentation**
10. **Include usage examples** in comments

### When Reviewing Code

Look for:
- Missing error handling
- Missing JSDoc comments
- ES6 syntax (should be ES5)
- Direct Drive API calls (should use driveIterator)
- Non-standard response formats
- Missing user authentication checks
- Hard-coded values (should be constants)
- Security issues (XSS, injection, etc.)

### When Explaining Code

- Reference specific files and line numbers
- Explain WHY, not just WHAT
- Highlight design patterns used
- Point out potential issues
- Suggest improvements (with reasons)

---

## Project-Specific Conventions

### File Naming

- **Apps Script:** `ModuleName.gs` (PascalCase)
- **HTML:** `Sidebar.html` (PascalCase)
- **Docs:** `DOCUMENT_NAME.md` (UPPER_SNAKE_CASE)

### Function Naming

```javascript
// Modules: PascalCase
var CleanerModule = (function() {})();

// Public functions: camelCase, verb-first
function scanSharedFiles() { }
function getUserLicense() { }
function calculateFileSize() { }

// Private helpers: camelCase with underscore
function _parseResponse(data) { }
function _validateInput(input) { }

// Event handlers: "on" prefix
function onOpen() { }
function onClick() { }
```

### Variable Naming

```javascript
// Boolean: "is", "has", "can" prefix
var isActive = true;
var hasPermission = false;
var canDelete = false;

// Arrays: plural
var files = [];
var users = [];

// Objects: singular
var user = {};
var file = {};

// Counts: "count" or "num" suffix
var fileCount = 0;
var numResults = 100;
```

---

## Quick Reference

### Essential Files

- **Code.gs** - Entry point, menu, router
- **TangentCore.gs** - Shared library (driveIterator, logging, license)
- **CleanerModule.gs** - Janitor module implementation
- **Sidebar.html** - Main UI
- **appsscript.json** - Manifest and OAuth scopes

### Key Functions

- `route(action, payload)` - Central router (Code.gs)
- `driveIterator(query, token, batchSize)` - Pagination (TangentCore.gs)
- `logActivity(user, module, action, details)` - Logging (TangentCore.gs)
- `checkLicense(user)` - License check (TangentCore.gs)
- `scanSharedFiles()` - Main scan function (CleanerModule.gs)

### Common Tasks

**Add new action:**
1. Create function in appropriate module
2. Add case to `route()` switch
3. Update UI to call new action
4. Test thoroughly

**Add new module:**
1. Create `NewModule.gs` with revealing pattern
2. Add route cases in `Code.gs`
3. Add tab in `Sidebar.html`
4. Update documentation

---

## Questions for AI to Ask

Before making significant changes, AI should ask:

1. **Architecture:** "Should this be a new module or part of existing?"
2. **Data:** "Should this use driveIterator or direct API call?"
3. **Limits:** "Does this respect alpha safety limits?"
4. **UI:** "Should this be a new tab or modal?"
5. **Tier:** "Is this a free or premium feature?"
6. **Testing:** "How should I test this change?"
7. **Documentation:** "What docs need updating?"

---

## Version History

- **1.0** (2025-11-22) - Initial project context for TangentCore

---

**AI: Read this entire file before making code suggestions. When in doubt, ask before implementing.**
