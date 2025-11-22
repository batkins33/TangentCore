/**
 * TangentCore - Shared Library for Tangent Forge Utilities
 * Provides common utilities, licensing, logging, and Drive iteration
 */

var TangentCore = (function() {
  
  /**
   * Mock license check function
   * In production, this would query a backend service or Properties
   * @param {string} email - User email address
   * @returns {Object} License information
   */
  function checkLicense(email) {
    // Mock implementation - returns FREE tier with cleaner module
    return {
      tier: 'FREE',
      modules: ['cleaner'],
      email: email,
      expiresAt: null
    };
  }
  
  /**
   * Structured activity logger
   * @param {string} user - User identifier
   * @param {string} tool - Tool/module name
   * @param {string} action - Action performed
   */
  function logActivity(user, tool, action) {
    var timestamp = new Date().toISOString();
    var logEntry = {
      timestamp: timestamp,
      user: user,
      tool: tool,
      action: action
    };
    
    console.log(JSON.stringify(logEntry));
  }
  
  /**
   * CRITICAL: Drive Iterator with continuation token support
   * Handles Google's 6-minute execution limit by batching results
   * 
   * @param {string} query - Drive API search query
   * @param {string} continuationToken - Optional token for pagination
   * @param {number} batchSize - Number of files to return per batch (default: 100)
   * @returns {Object} { files: Array, nextToken: string|null, hasMore: boolean }
   */
  function driveIterator(query, continuationToken, batchSize) {
    batchSize = batchSize || 100;
    
    try {
      var files = [];
      var pageToken = continuationToken || null;
      var searchParams = {
        q: query,
        pageSize: Math.min(batchSize, 1000), // Drive API max is 1000
        fields: 'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime, owners, sharingUser)',
        pageToken: pageToken
      };
      
      // Execute the search
      var response = Drive.Files.list(searchParams);
      
      if (response.files && response.files.length > 0) {
        files = response.files;
      }
      
      return {
        files: files,
        nextToken: response.nextPageToken || null,
        hasMore: !!response.nextPageToken,
        count: files.length
      };
      
    } catch (error) {
      logActivity('system', 'driveIterator', 'error: ' + error.toString());
      throw new Error('Drive iteration failed: ' + error.toString());
    }
  }
  
  /**
   * Helper function to format bytes to MB
   * @param {number} bytes - Size in bytes
   * @returns {number} Size in MB (2 decimal places)
   */
  function bytesToMB(bytes) {
    if (!bytes || bytes === 0) return 0;
    return parseFloat((bytes / (1024 * 1024)).toFixed(2));
  }
  
  /**
   * Helper function to get file type category from MIME type
   * @param {string} mimeType - Google Drive MIME type
   * @returns {string} Category name
   */
  function categorizeFileType(mimeType) {
    if (!mimeType) return 'Other';
    
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('spreadsheet')) return 'Sheets';
    if (mimeType.includes('document')) return 'Docs';
    if (mimeType.includes('image')) return 'Images';
    if (mimeType.includes('presentation')) return 'Slides';
    if (mimeType.includes('video')) return 'Videos';
    if (mimeType.includes('folder')) return 'Folders';
    
    return 'Other';
  }
  
  // Public API
  return {
    checkLicense: checkLicense,
    logActivity: logActivity,
    driveIterator: driveIterator,
    bytesToMB: bytesToMB,
    categorizeFileType: categorizeFileType
  };
  
})();
