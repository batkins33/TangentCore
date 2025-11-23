/**
 * CleanerModule - Shared Drive Cleaner Logic
 * Scans and analyzes "Shared with Me" files
 */

var CleanupModule = (function () {
  /**
   * Scans shared files and returns analytics
   * ALPHA VERSION: Hard capped at 500 files for speed
   * READ-ONLY: Does not delete any files
   *
   * @returns {Object} Scan results with metrics
   */
  function scanSharedFiles() {
    var user = Session.getActiveUser().getEmail();
    TangentCore.logActivity(user, "cleaner", "scanSharedFiles_started");

    try {
      var totalCount = 0;
      var totalSizeBytes = 0;
      var fileTypes = {
        PDF: 0,
        Sheets: 0,
        Docs: 0,
        Images: 0,
        Slides: 0,
        Videos: 0,
        Folders: 0,
        Other: 0,
      };

      // Alpha version hard cap
      var MAX_FILES = 500;
      var continuationToken = null;
      var hasMore = true;

      // Query for shared files
      var query = "sharedWithMe = true and trashed = false";

      // Iterate through files using the robust iterator
      while (hasMore && totalCount < MAX_FILES) {
        var remaining = MAX_FILES - totalCount;
        var batchSize = Math.min(remaining, 100);

        var result = TangentCore.driveIterator(
          query,
          continuationToken,
          batchSize
        );

        // Process this batch
        for (var i = 0; i < result.files.length; i++) {
          var file = result.files[i];

          // Count the file
          totalCount++;

          // Add to size total (some files may not have size, like folders)
          if (file.size) {
            totalSizeBytes += parseInt(file.size);
          }

          // Categorize file type
          var category = TangentCore.categorizeFileType(file.mimeType);
          fileTypes[category]++;

          // Stop if we hit the cap
          if (totalCount >= MAX_FILES) {
            break;
          }
        }

        // Update pagination
        continuationToken = result.nextToken;
        hasMore = result.hasMore && totalCount < MAX_FILES;
      }

      // Convert total size to MB
      var totalSizeMB = TangentCore.bytesToMB(totalSizeBytes);

      // Log completion
      TangentCore.logActivity(
        user,
        "cleaner",
        "scanSharedFiles_completed: " + totalCount + " files"
      );

      // Return results
      return {
        success: true,
        data: {
          totalCount: totalCount,
          totalSizeMB: totalSizeMB,
          fileTypes: fileTypes,
          cappedAt: MAX_FILES,
          wasLimited: totalCount >= MAX_FILES,
        },
      };
    } catch (error) {
      TangentCore.logActivity(
        user,
        "cleaner",
        "scanSharedFiles_error: " + error.toString()
      );
      return {
        success: false,
        error: error.toString(),
      };
    }
  }

  // Public API
  return {
    scanSharedFiles: scanSharedFiles,
  };
})();
