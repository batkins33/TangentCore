# TangentCore API Reference

Complete reference for all public functions in TangentCore.

---

## Code.gs - Entry Point & Router

### onOpen(e)

Creates the "Tangent Forge" menu when a document is opened.

**Signature:**
```javascript
function onOpen(e)
```

**Parameters:**
- `e` (Object) - Event object from Google Apps Script

**Returns:** `void`

**Example:**
```javascript
// Automatically called by Google Apps Script
// Creates menu: Tangent Forge → Open Utilities
```

---

### showSidebar()

Displays the TangentCore sidebar interface.

**Signature:**
```javascript
function showSidebar()
```

**Parameters:** None

**Returns:** `void`

**Example:**
```javascript
showSidebar(); // Opens sidebar on right side
```

---

### route(action, payload)

Central router for handling UI actions.

**Signature:**
```javascript
function route(action, payload)
```

**Parameters:**
- `action` (string) - Action identifier
- `payload` (Object|null) - Optional data payload

**Returns:** `Object`
```javascript
{
  success: boolean,
  data?: Object,    // On success
  error?: string    // On failure
}
```

**Actions:**
- `'scanShared'` - Trigger shared file scan
- `'getLicense'` - Get user license info

**Examples:**
```javascript
// Scan shared files
var result = route('scanShared', null);
// Returns: { success: true, data: { totalCount, totalSizeMB, fileTypes } }

// Get license
var license = route('getLicense', null);
// Returns: { success: true, data: { tier, modules, email } }
```

---

## TangentCore.gs - Shared Library

### checkLicense(email)

Verifies user license and module access.

**Signature:**
```javascript
TangentCore.checkLicense(email)
```

**Parameters:**
- `email` (string) - User email address

**Returns:** `Object`
```javascript
{
  tier: string,        // 'FREE', 'PRO', 'ENTERPRISE'
  modules: string[],   // ['cleaner', 'brand', 'ops']
  email: string,
  expiresAt: Date|null
}
```

**Example:**
```javascript
var license = TangentCore.checkLicense('user@example.com');
console.log(license.tier); // 'FREE'
console.log(license.modules); // ['cleaner']
```

---

### logActivity(user, tool, action)

Logs structured activity to console.

**Signature:**
```javascript
TangentCore.logActivity(user, tool, action)
```

**Parameters:**
- `user` (string) - User identifier (email)
- `tool` (string) - Module name ('cleaner', 'brand', 'ops')
- `action` (string) - Action description

**Returns:** `void`

**Output Format:**
```json
{
  "timestamp": "2025-11-22T01:00:00.000Z",
  "user": "user@example.com",
  "tool": "cleaner",
  "action": "scanSharedFiles_started"
}
```

**Example:**
```javascript
TangentCore.logActivity(
  'user@example.com',
  'cleaner',
  'scanSharedFiles_completed: 487 files'
);
```

---

### driveIterator(query, continuationToken, batchSize)

**⚠️ CRITICAL** - Paginated Drive API queries with timeout protection.

**Signature:**
```javascript
TangentCore.driveIterator(query, continuationToken, batchSize)
```

**Parameters:**
- `query` (string) - Drive API search query
- `continuationToken` (string|null) - Pagination token (null for first call)
- `batchSize` (number) - Files per batch (default: 100, max: 1000)

**Returns:** `Object`
```javascript
{
  files: Object[],      // Array of file objects
  nextToken: string|null,  // Token for next page
  hasMore: boolean,     // True if more results exist
  count: number         // Number of files in this batch
}
```

**File Object Structure:**
```javascript
{
  id: string,
  name: string,
  mimeType: string,
  size: string,         // Bytes as string
  createdTime: string,
  modifiedTime: string,
  owners: Object[],
  sharingUser: Object
}
```

**Example:**
```javascript
// Single batch
var result = TangentCore.driveIterator(
  'sharedWithMe = true',
  null,
  100
);
console.log(result.count); // 100
console.log(result.hasMore); // true

// Paginated loop
var query = 'sharedWithMe = true and trashed = false';
var token = null;
var allFiles = [];

do {
  var result = TangentCore.driveIterator(query, token, 100);
  allFiles = allFiles.concat(result.files);
  token = result.nextToken;
} while (result.hasMore && allFiles.length < 500);
```

**Query Examples:**
```javascript
// Shared files
'sharedWithMe = true and trashed = false'

// PDFs only
'sharedWithMe = true and mimeType = "application/pdf"'

// Large files
'sharedWithMe = true and size > 10485760' // >10MB

// Modified recently
'sharedWithMe = true and modifiedTime > "2025-01-01T00:00:00"'
```

---

### bytesToMB(bytes)

Converts bytes to megabytes.

**Signature:**
```javascript
TangentCore.bytesToMB(bytes)
```

**Parameters:**
- `bytes` (number) - Size in bytes

**Returns:** `number` - Size in MB (2 decimal places)

**Example:**
```javascript
var mb = TangentCore.bytesToMB(25165824);
console.log(mb); // 24.00
```

---

### categorizeFileType(mimeType)

Maps MIME type to category.

**Signature:**
```javascript
TangentCore.categorizeFileType(mimeType)
```

**Parameters:**
- `mimeType` (string) - Google Drive MIME type

**Returns:** `string` - Category name

**Categories:**
- `'PDF'` - application/pdf
- `'Sheets'` - application/vnd.google-apps.spreadsheet
- `'Docs'` - application/vnd.google-apps.document
- `'Images'` - image/*
- `'Slides'` - application/vnd.google-apps.presentation
- `'Videos'` - video/*
- `'Folders'` - application/vnd.google-apps.folder
- `'Other'` - Everything else

**Example:**
```javascript
var category = TangentCore.categorizeFileType('application/pdf');
console.log(category); // 'PDF'

var category2 = TangentCore.categorizeFileType('image/jpeg');
console.log(category2); // 'Images'
```

---

## CleanerModule.gs - Shared Drive Cleaner

### scanSharedFiles()

Scans "Shared with Me" files and returns analytics.

**Signature:**
```javascript
CleanerModule.scanSharedFiles()
```

**Parameters:** None

**Returns:** `Object`
```javascript
{
  success: boolean,
  data?: {
    totalCount: number,      // Total files scanned
    totalSizeMB: number,     // Total size in MB (2 decimals)
    fileTypes: Object,       // Count by category
    cappedAt: number,        // Max files (500)
    wasLimited: boolean      // True if hit cap
  },
  error?: string             // On failure
}
```

**File Types Object:**
```javascript
{
  'PDF': number,
  'Sheets': number,
  'Docs': number,
  'Images': number,
  'Slides': number,
  'Videos': number,
  'Folders': number,
  'Other': number
}
```

**Example:**
```javascript
var result = CleanerModule.scanSharedFiles();

if (result.success) {
  console.log('Files:', result.data.totalCount);
  console.log('Size:', result.data.totalSizeMB + ' MB');
  console.log('PDFs:', result.data.fileTypes.PDF);
  console.log('Limited:', result.data.wasLimited);
} else {
  console.error('Error:', result.error);
}
```

**Alpha Constraints:**
- Maximum 500 files
- Read-only (no deletion)
- Query: `sharedWithMe = true and trashed = false`

---

## Sidebar.html - UI Functions

### switchTab(tab)

Switches between tabs in the sidebar.

**Signature:**
```javascript
function switchTab(tab)
```

**Parameters:**
- `tab` (string) - Tab identifier ('janitor', 'brand', 'ops')

**Returns:** `void`

**Note:** Only 'janitor' is active in alpha version.

**Example:**
```javascript
switchTab('janitor'); // Switches to Janitor tab
```

---

### startScan()

Initiates a shared file scan.

**Signature:**
```javascript
function startScan()
```

**Parameters:** None

**Returns:** `void`

**Side Effects:**
- Disables scan button
- Shows loading spinner
- Calls `google.script.run.route('scanShared', null)`

**Example:**
```javascript
// Called by button click
<button onclick="startScan()">Scan</button>
```

---

### updateUI(response)

Updates UI with scan results.

**Signature:**
```javascript
function updateUI(response)
```

**Parameters:**
- `response` (Object) - Response from `route()` function

**Returns:** `void`

**Side Effects:**
- Updates hero metric
- Populates file type grid
- Shows/hides viral link
- Re-enables scan button

**Example:**
```javascript
google.script.run
  .withSuccessHandler(updateUI)
  .route('scanShared', null);
```

---

### handleError(error)

Handles errors from backend calls.

**Signature:**
```javascript
function handleError(error)
```

**Parameters:**
- `error` (Object) - Error object from Google Apps Script

**Returns:** `void`

**Side Effects:**
- Shows alert with error message
- Re-enables scan button
- Hides loading spinner

**Example:**
```javascript
google.script.run
  .withFailureHandler(handleError)
  .route('scanShared', null);
```

---

## Error Handling

### Standard Error Format

All functions return errors in this format:

```javascript
{
  success: false,
  error: string  // Human-readable error message
}
```

### Common Errors

**Permission Denied:**
```javascript
{
  success: false,
  error: "Permission denied. Please authorize the add-on."
}
```

**API Timeout:**
```javascript
{
  success: false,
  error: "Drive iteration failed: Timeout"
}
```

**Unknown Action:**
```javascript
{
  success: false,
  error: "Unknown action: invalidAction"
}
```

---

## Best Practices

### 1. Always Check Success

```javascript
var result = CleanerModule.scanSharedFiles();
if (result.success) {
  // Handle success
} else {
  // Handle error
  console.error(result.error);
}
```

### 2. Use driveIterator for Large Queries

```javascript
// DON'T: Query all files at once
var files = Drive.Files.list({ q: query }).files; // May timeout!

// DO: Use iterator with batching
var result = TangentCore.driveIterator(query, null, 100);
```

### 3. Log Important Actions

```javascript
TangentCore.logActivity(user, 'cleaner', 'scanStarted');
// ... perform action ...
TangentCore.logActivity(user, 'cleaner', 'scanCompleted: ' + count);
```

### 4. Handle Pagination

```javascript
var token = null;
do {
  var result = TangentCore.driveIterator(query, token, 100);
  // Process result.files
  token = result.nextToken;
} while (result.hasMore);
```

---

## Version History

### 1.0.0-alpha (Current)
- Initial release
- Shared Drive Cleaner
- TangentCore library
- Drive iterator

### Future Versions
- 1.0.0-beta - File operations, export
- 1.1.0 - Brand module
- 1.2.0 - Site Ops module

---

**Last Updated:** 2025-11-22  
**API Version:** 1.0.0-alpha
