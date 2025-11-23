/**
 * TangentCore - Shared Library & Utilities
 * Handles logging, licensing, and Drive API iterations
 */
var TangentCore = (function () {
  // --- Internal Helper Functions ---

  function checkLicense(email) {
    // Mock license check
    return { tier: "FREE", modules: ["cleaner"] };
  }

  function logActivity(user, tool, action) {
    console.log(
      `[${new Date().toISOString()}] User: ${user} | Tool: ${tool} | Action: ${action}`
    );
  }

  /**
   * Converts raw bytes to Megabytes (MB) formatted to 2 decimals
   */
  function bytesToMB(bytes) {
    if (!bytes || bytes === 0) return 0;
    return (bytes / (1024 * 1024)).toFixed(2);
  }

  /**
   * Categorizes MIME types into user-friendly buckets
   */
  function categorizeFileType(mimeType) {
    if (mimeType.includes("pdf")) return "PDF";
    if (
      mimeType.includes("spreadsheet") ||
      mimeType.includes("excel") ||
      mimeType.includes("csv")
    )
      return "Sheets";
    if (mimeType.includes("document") || mimeType.includes("word"))
      return "Docs";
    if (mimeType.includes("image")) return "Images";
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
      return "Slides";
    if (mimeType.includes("folder")) return "Folders";
    if (mimeType.includes("video")) return "Videos";
    return "Other";
  }

  /**
   * Robust Drive Iterator to handle timeouts and pagination
   */
  function driveIterator(query, pageToken, maxResults) {
    // Use the Advanced Drive Service (Ensure 'Drive' service is enabled)
    var args = {
      q: query,
      pageSize: maxResults || 100,
      fields: "nextPageToken, files(id, name, mimeType, size)",
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
    };

    if (pageToken) {
      args.pageToken = pageToken;
    }

    var response = Drive.Files.list(args);

    return {
      files: response.files || [],
      nextToken: response.nextPageToken,
      hasMore: !!response.nextPageToken,
    };
  }

  // --- Public API ---
  return {
    checkLicense: checkLicense,
    logActivity: logActivity,
    driveIterator: driveIterator,
    bytesToMB: bytesToMB, // <--- NEW: Added this
    categorizeFileType: categorizeFileType, // <--- NEW: Added this
  };
})();
