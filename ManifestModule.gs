/**
 * Project Manifest Generator Module
 * Context-Aware: Works in both Sheets and Docs
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

      // Validate we're in a Sheet or Doc
      if (appType !== "SHEET" && appType !== "DOC") {
        return {
          success: false,
          error:
            "The Manifest tool requires Google Sheets or Docs. You are in: " +
            (appType || "Unknown app"),
        };
      }

      // Scan Root Drive (Limit 20 for Alpha)
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

      var headers = [
        ["File Name", "Type", "Size (MB)", "Last Updated", "Link"],
      ];

      var sheet;
      var responseType;
      var responseUrl;

      // SCENARIO A: Running in a Doc - Create New Spreadsheet
      if (appType === "DOC") {
        var newSheetName = "Project Manifest - " + new Date().toLocaleDateString();
        var newSpreadsheet = SpreadsheetApp.create(newSheetName);
        sheet = newSpreadsheet.getActiveSheet();
        sheet.setName("Manifest Report");
        
        responseType = "NEW_FILE";
        responseUrl = newSpreadsheet.getUrl();
      }
      // SCENARIO B: Running in a Sheet - Update Existing
      else if (appType === "SHEET") {
        var sheetName = "Manifest Report";
        sheet = app.getSheetByName(sheetName);
        
        if (sheet) {
          // Sheet exists - clear it
          sheet.clear();
        } else {
          // Sheet doesn't exist - create it
          sheet = app.insertSheet(sheetName);
        }
        
        // Activate the sheet
        app.setActiveSheet(sheet);
        
        responseType = "UPDATE";
      }

      // Write Headers
      sheet.getRange(1, 1, 1, 5).setValues(headers);

      // Write Data
      if (fileData.length > 0) {
        sheet.getRange(2, 1, fileData.length, 5).setValues(fileData);
      }
        message: "Manifest created with " + count + " files.",
        type: responseType,
        url: responseUrl,
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
