/**
 * Project Manifest Generator Module
 * Scans files and creates a Table of Contents in Sheets
 */
var ManifestModule = (function () {
  /**
   * Generates a manifest of files in the user's root drive
   * @returns {Object} Standard response object
   */
  function generateManifest() {
    try {
      // 1. Check if active app is Spreadsheet
      var ss;
      try {
        ss = SpreadsheetApp.getActiveSpreadsheet();
      } catch (e) {
        return {
          success: false,
          error: "Please open a Google Sheet to use this tool.",
        };
      }

      if (!ss) {
        return {
          success: false,
          error: "Please open a Google Sheet to use this tool.",
        };
      }

      // 2. Create new sheet
      var timeStamp = Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd_HHmm"
      );
      var sheetName = "Manifest_" + timeStamp;
      var sheet = ss.insertSheet(sheetName);

      // 3. Scan Root Drive (Limit 20 for Alpha)
      var files = DriveApp.getRootFolder().getFiles();
      var fileData = [];
      var limit = 20;
      var count = 0;

      while (files.hasNext() && count < limit) {
        var file = files.next();
        fileData.push([
          file.getName(),
          file.getMimeType(),
          (file.getSize() / 1024 / 1024).toFixed(2), // Size in MB
          file.getLastUpdated(),
          file.getUrl(),
        ]);
        count++;
      }

      // 4. Write Header
      var headers = [
        ["File Name", "Type", "Size (MB)", "Last Updated", "Link"],
      ];
      sheet.getRange(1, 1, 1, 5).setValues(headers);

      // 5. Write Data
      if (fileData.length > 0) {
        sheet.getRange(2, 1, fileData.length, 5).setValues(fileData);
      }

      // 6. Formatting
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange
        .setBackground("#F47C26") // Forge Orange
        .setFontColor("#FFFFFF")
        .setFontWeight("bold");

      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, 5);

      return {
        success: true,
        message: "Manifest created with " + count + " files.",
      };
    } catch (error) {
      console.error("Manifest Error:", error);
      return {
        success: false,
        error: error.toString(),
      };
    }
  }

  // Public API
  return {
    generateManifest: generateManifest,
  };
})();
