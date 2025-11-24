/**
 * DismissModule - Safe Cleanup Utility
 * Allows users to remove files from "Shared With Me" without deleting them
 *
 * SAFETY: Only works on files the user does NOT own
 * For owned files, use Pro tier deletion features
 */

var DismissModule = (function () {
  /**
   * Dismisses a single file from "Shared With Me"
   *
   * @param {string} fileId - The ID of the file to dismiss
   * @returns {Object} Result object with success status
   */
  function dismissFile(fileId) {
    var user = Session.getActiveUser().getEmail();

    try {
      // Get file metadata to check ownership
      var file = Drive.Files.get(fileId, {
        fields: "owners(emailAddress),name",
      });

      // Safety Check: Verify user is NOT the owner
      if (file.owners && file.owners.length > 0) {
        for (var i = 0; i < file.owners.length; i++) {
          if (file.owners[i].emailAddress === user) {
            TangentCore.logActivity(
              user,
              "dismiss",
              "dismissFile_blocked_IS_OWNER: " + fileId
            );
            return {
              success: false,
              error: "IS_OWNER",
              message:
                "Cannot dismiss files you own. Use Pro tier deletion features.",
              fileName: file.name,
            };
          }
        }
      }

      // User is not the owner - safe to dismiss
      Drive.Files.remove(fileId);

      TangentCore.logActivity(
        user,
        "dismiss",
        "dismissFile_success: " + fileId
      );

      return {
        success: true,
        fileId: fileId,
        fileName: file.name,
      };
    } catch (error) {
      TangentCore.logActivity(
        user,
        "dismiss",
        "dismissFile_error: " + fileId + " - " + error.toString()
      );

      return {
        success: false,
        error: error.toString(),
        fileId: fileId,
      };
    }
  }

  /**
   * Dismisses multiple files in batch
   *
   * @param {Array<string>} fileIds - Array of file IDs to dismiss
   * @returns {Object} Batch result with counts and errors
   */
  function dismissBatch(fileIds) {
    var user = Session.getActiveUser().getEmail();
    TangentCore.logActivity(
      user,
      "dismiss",
      "dismissBatch_started: " + fileIds.length + " files"
    );

    var successCount = 0;
    var failCount = 0;
    var errors = [];

    for (var i = 0; i < fileIds.length; i++) {
      var result = dismissFile(fileIds[i]);

      if (result.success) {
        successCount++;
      } else {
        failCount++;
        errors.push({
          fileId: fileIds[i],
          fileName: result.fileName || "Unknown",
          error: result.error,
          message: result.message,
        });
      }
    }

    TangentCore.logActivity(
      user,
      "dismiss",
      "dismissBatch_completed: " +
        successCount +
        " success, " +
        failCount +
        " failed"
    );

    return {
      success: true,
      data: {
        successCount: successCount,
        failCount: failCount,
        totalProcessed: fileIds.length,
        errors: errors,
      },
    };
  }

  // Public API
  return {
    dismissFile: dismissFile,
    dismissBatch: dismissBatch,
  };
})();
