# TangentCore Technical Documentation

This document provides technical details about the TangentCore architecture, implementation, and development guidelines.

---

## 🏗️ Architecture Overview

### Monolith Design Pattern

TangentCore uses a **monolith architecture** where one add-on contains multiple modules. This approach provides:

**Benefits:**
- Single deployment and maintenance
- Shared code library (TangentCore.gs)
- Consistent UI/UX across modules
- Simplified OAuth and permissions

**Structure:**
```
TangentCore (Add-on)
├── TangentCore.gs (Shared Library)
├── Code.gs (Router & Entry Point)
├── CleanerModule.gs (Janitor)
├── BrandModule.gs (Future)
└── OpsModule.gs (Future)
```

---

## 📦 Core Components

### 1. Code.gs - Entry Point & Router

**Purpose:** Main entry point, menu creation, and action routing

#### Key Functions

```javascript
function onOpen(e)
```
- **Trigger:** Document open
- **Action:** Creates "Tangent Forge" menu
- **Returns:** void

```javascript
function onHomepage(e)
```
- **Trigger:** Add-on homepage request
- **Action:** Opens sidebar
- **Returns:** null

```javascript
function route(action, payload)
```
- **Purpose:** Central router for all UI actions
- **Parameters:**
  - `action` (string) - Action identifier
  - `payload` (Object) - Optional data
- **Returns:** Object with `{ success, data/error }`
- **Actions:**
  - `scanShared` - Triggers file scan
  - `getLicense` - Returns license info

#### Implementation Details

**Menu Creation:**
```javascript
var ui = SpreadsheetApp.getUi();
ui.createMenu('Tangent Forge')
  .addItem('Open Utilities', 'showSidebar')
  .addToUi();
```

**Sidebar Display:**
```javascript
var html = HtmlService.createHtmlOutputFromFile('Sidebar')
  .setTitle('Tangent Forge Utilities')
  .setWidth(350);
SpreadsheetApp.getUi().showSidebar(html);
```

**Error Handling:**
- All routes wrapped in try/catch
- Returns standardized error objects
- Logs errors to console

---

### 2. TangentCore.gs - Shared Library

**Purpose:** Common utilities, licensing, logging, and Drive operations

#### Key Functions

##### checkLicense(email)

```javascript
function checkLicense(email)
```
- **Purpose:** Verify user license and module access
- **Parameters:** `email` (string) - User email
- **Returns:** `{ tier, modules, email, expiresAt }`
- **Current:** Mock implementation (FREE tier)
- **Future:** Backend API integration

**Implementation:**
```javascript
return {
  tier: 'FREE',
  modules: ['cleaner'],
  email: email,
  expiresAt: null
};
```

##### logActivity(user, tool, action)

```javascript
function logActivity(user, tool, action)
```
- **Purpose:** Structured activity logging
- **Parameters:**
  - `user` (string) - User identifier
  - `tool` (string) - Module name
  - `action` (string) - Action performed
- **Output:** JSON to console.log

**Log Format:**
```json
{
  "timestamp": "2025-11-22T01:00:00.000Z",
  "user": "user@example.com",
  "tool": "cleaner",
  "action": "scanSharedFiles_started"
}
```

##### driveIterator(query, continuationToken, batchSize)

**⚠️ CRITICAL FUNCTION** - Prevents 6-minute timeout issues

```javascript
function driveIterator(query, continuationToken, batchSize)
```
- **Purpose:** Paginated Drive API queries with timeout protection
- **Parameters:**
  - `query` (string) - Drive API search query
  - `continuationToken` (string|null) - Pagination token
  - `batchSize` (number) - Files per batch (default: 100)
- **Returns:** `{ files, nextToken, hasMore, count }`

**Why It's Critical:**
- Google Apps Script has 6-minute execution limit
- Large Drive queries can timeout
- Iterator allows resumable operations
- Batching prevents memory issues

**Implementation:**
```javascript
var searchParams = {
  q: query,
  pageSize: Math.min(batchSize, 1000), // API max
  fields: 'nextPageToken, files(id, name, mimeType, size, ...)',
  pageToken: pageToken
};

var response = Drive.Files.list(searchParams);

return {
  files: response.files,
  nextToken: response.nextPageToken || null,
  hasMore: !!response.nextPageToken,
  count: response.files.length
};
```

**Usage Example:**
```javascript
var query = 'sharedWithMe = true and trashed = false';
var token = null;
var allFiles = [];

do {
  var result = TangentCore.driveIterator(query, token, 100);
  allFiles = allFiles.concat(result.files);
  token = result.nextToken;
} while (result.hasMore && allFiles.length < 500);
```

##### Helper Functions

```javascript
function bytesToMB(bytes)
```
- Converts bytes to megabytes (2 decimals)

```javascript
function categorizeFileType(mimeType)
```
- Maps MIME types to categories
- Returns: PDF, Sheets, Docs, Images, etc.

---

### 3. CleanerModule.gs - Shared Drive Cleaner

**Purpose:** Scan and analyze shared files

#### Key Functions

##### scanSharedFiles()

```javascript
function scanSharedFiles()
```
- **Purpose:** Scan "Shared with Me" files
- **Parameters:** None
- **Returns:** `{ success, data: { totalCount, totalSizeMB, fileTypes, cappedAt, wasLimited } }`

**Alpha Constraints:**
- Hard cap: 500 files
- Read-only: No deletion
- Query: `sharedWithMe = true and trashed = false`

**Implementation Flow:**

1. **Initialize counters**
```javascript
var totalCount = 0;
var totalSizeBytes = 0;
var fileTypes = {
  'PDF': 0, 'Sheets': 0, 'Docs': 0,
  'Images': 0, 'Slides': 0, 'Videos': 0,
  'Folders': 0, 'Other': 0
};
```

2. **Iterate with driveIterator**
```javascript
while (hasMore && totalCount < MAX_FILES) {
  var result = TangentCore.driveIterator(query, token, batchSize);
  // Process files...
  token = result.nextToken;
  hasMore = result.hasMore;
}
```

3. **Process each file**
```javascript
for (var i = 0; i < result.files.length; i++) {
  var file = result.files[i];
  totalCount++;
  totalSizeBytes += parseInt(file.size || 0);
  var category = TangentCore.categorizeFileType(file.mimeType);
  fileTypes[category]++;
}
```

4. **Return results**
```javascript
return {
  success: true,
  data: {
    totalCount: totalCount,
    totalSizeMB: TangentCore.bytesToMB(totalSizeBytes),
    fileTypes: fileTypes,
    cappedAt: MAX_FILES,
    wasLimited: totalCount >= MAX_FILES
  }
};
```

**Error Handling:**
- Try/catch wrapper
- Logs errors via TangentCore.logActivity
- Returns `{ success: false, error: message }`

---

### 4. Sidebar.html - User Interface

**Purpose:** Modern, brand-aligned UI for user interaction

#### Technology Stack

- **HTML5** - Structure
- **Tailwind CSS** - Styling (via CDN)
- **Vanilla JavaScript** - Interactivity
- **Google Fonts** - Inter typography

#### UI Architecture

**Layout:**
```
┌─────────────────────────────┐
│  Tab Navigation             │ ← Janitor | Brand | Ops
├─────────────────────────────┤
│                             │
│  Content Area               │ ← Dynamic per tab
│  ┌─────────────────────┐   │
│  │ Card                │   │
│  │  - Hero Metric      │   │
│  │  - File Grid        │   │
│  │  - Action Button    │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

#### Color Implementation

**Foundation (60%):**
```css
body {
  background-color: #2B2D31; /* Forge Charcoal */
}

.card {
  background-color: #1F1F23; /* Deep Charcoal */
}
```

**Interaction (10%):**
```css
.tab-active {
  border-bottom: 3px solid #1098AD; /* Anvil Blue */
  color: #1098AD;
}

.spinner {
  border-top: 3px solid #1098AD;
}
```

**Action Spark (5%):**
```css
.btn-primary {
  background-color: #D96704; /* Forge Orange */
  max-width: 220px; /* Contained! */
}

.metric-display {
  color: #D96704; /* Orange for data */
}
```

#### JavaScript Integration

**Calling Backend:**
```javascript
google.script.run
  .withSuccessHandler(updateUI)
  .withFailureHandler(handleError)
  .route('scanShared', null);
```

**Success Handler:**
```javascript
function updateUI(response) {
  if (response.success) {
    var data = response.data;
    // Update DOM with results
    document.getElementById('gb-metric').textContent = 
      (data.totalSizeMB / 1024).toFixed(2) + ' GB';
  }
}
```

**Error Handler:**
```javascript
function handleError(error) {
  alert('An error occurred: ' + error.message);
}
```

---

## 🔐 Security & Permissions

### OAuth Scopes

**Required Scopes:**
```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets.currentonly",
    "https://www.googleapis.com/auth/script.container.ui"
  ]
}
```

**Scope Justifications:**
- `drive.readonly` - Read file metadata (no content access)
- `spreadsheets.currentonly` - Display sidebar in current sheet
- `script.container.ui` - Show UI elements

### Security Best Practices

1. **Minimal Scopes** - Only request what's needed
2. **Read-Only** - No file modification in alpha
3. **No Storage** - All processing in-session
4. **Error Handling** - Never expose sensitive data in errors
5. **Logging** - Structured logs for audit trail

---

## 📊 Performance Considerations

### Execution Time Limits

**Google Apps Script Limits:**
- **6 minutes** - Maximum execution time
- **30 seconds** - Custom function timeout
- **5 minutes** - Simple trigger timeout

**TangentCore Solutions:**
- `driveIterator` - Batched operations
- 500-file cap - Ensures fast completion
- Pagination tokens - Resumable operations

### Memory Management

**Best Practices:**
- Process files in batches (100 at a time)
- Don't store full file objects
- Extract only needed fields
- Clear variables after use

**Drive API Fields:**
```javascript
fields: 'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime, owners, sharingUser)'
```
- Only request fields you'll use
- Reduces payload size
- Faster API responses

### API Quotas

**Drive API Limits:**
- 1,000 queries per 100 seconds per user
- 10,000 queries per 100 seconds per project

**TangentCore Usage:**
- ~5-10 API calls per scan (500 files)
- Well within quota limits
- No quota issues expected

---

## 🧪 Testing

### Manual Testing

**Test Scenarios:**

1. **First Time User**
   - Open add-on
   - Authorize permissions
   - Run scan
   - Verify results

2. **No Shared Files**
   - User with empty "Shared with Me"
   - Verify graceful handling
   - Show appropriate message

3. **Large File Count**
   - User with >500 shared files
   - Verify 500-file cap works
   - Check `wasLimited` flag

4. **Error Conditions**
   - Network failure
   - API timeout
   - Permission denied
   - Verify error messages

### Test Data

**Create Test Scenarios:**
```javascript
// Share test files with yourself
// Vary file types: PDF, Sheets, Docs, Images
// Vary file sizes: Small, Medium, Large
// Test with 0, 50, 500, 1000+ files
```

### Debugging

**Console Logging:**
```javascript
console.log(JSON.stringify(logEntry));
```

**View Logs:**
- Apps Script Editor → Executions
- Filter by function name
- Check execution time
- Review error messages

---

## 🔄 Deployment

### Development Workflow

1. **Edit in Apps Script Editor**
2. **Test with `onOpen()` function**
3. **Review execution logs**
4. **Iterate on feedback**

### Version Control

**Git Workflow:**
```bash
git add .
git commit -m "feat: add file type categorization"
git push origin main
```

**Semantic Versioning:**
- `1.0.0-alpha` - Current
- `1.0.0-beta` - Next
- `1.0.0` - Production

### Deployment Checklist

- [ ] All functions tested
- [ ] Error handling verified
- [ ] UI responsive
- [ ] Brand guidelines followed
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped

---

## 📚 API Reference

See [API.md](API.md) for complete function signatures and examples.

---

## 🐛 Known Issues

### Alpha Limitations

1. **500-file cap** - Will increase in Beta
2. **No deletion** - Read-only for safety
3. **No export** - Coming in Beta
4. **No filters** - Coming in Beta

### Future Improvements

1. **Resumable scans** - Use continuation tokens
2. **Background processing** - Time-based triggers
3. **Caching** - Store recent scan results
4. **Batch operations** - Select multiple files

---

## 📞 Developer Support

**Questions?**
- GitHub Issues: [tangentforge/tangentcore/issues](https://github.com/tangentforge/tangentcore/issues)
- Email: dev@tangentforge.com
- Docs: [Full Documentation](README.md)

---

**Last Updated:** 2025-11-22  
**Version:** 1.0.0-alpha
