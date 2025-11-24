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
      // Robust app context detection
      var app = null;
      var appType = "";

      // Try Spreadsheet first (Safe Check)
      try {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        if (ss) {
          app = ss;
          appType = "SHEET";
        }
      } catch (e) {
        // Not a sheet - that's okay, continue checking
      }

      // Try Doc second
      if (!app) {
        try {
          var doc = DocumentApp.getActiveDocument();
          if (doc) {
            app = doc;
            appType = "DOC";
          }
        } catch (e) {
          // Not a doc - that's okay
        }
      }

      // Try Slides third
      if (!app) {
        try {
          var presentation = SlidesApp.getActivePresentation();
          if (presentation) {
            app = presentation;
            appType = "SLIDES";
          }
        } catch (e) {
          // Not slides - that's okay
        }
      }

      // Validate we're in a Sheet (requirement for Manifest)
      if (appType !== "SHEET") {
        return {
          success: false,
          error:
            "The Manifest tool currently only supports Google Sheets. You are in: " +
            (appType || "Unknown app"),
        };
      }

      // 2. Create new sheet
      var timeStamp = Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd_HHmm"
      );
      var sheetName = "Manifest_" + timeStamp;
      var sheet = app.insertSheet(sheetName);

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
