/**
 * Tangent Forge Utilities - Main Entry Point
 * A professional Google Workspace Add-on with modular architecture
 * Supports: Sheets, Docs, and Slides
 */

/**
 * Creates the add-on menu when the file is opened
 * dynamically detecting the host application.
 * @param {Object} e - The event object
 */
function onOpen(e) {
  var ui = getTangentUi_();
  if (ui) {
    ui.createMenu("Tangent Forge")
      .addItem("Open Utilities", "showSidebar")
      .addToUi();
  }
}

/**
 * Opens the sidebar.
 * Automatically detects if running in Sheets, Docs, or Slides.
 */
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("Sidebar")
    .setTitle("Tangent Forge Utilities")
    .setWidth(350);

  var ui = getTangentUi_();
  if (ui) {
    ui.showSidebar(html);
  } else {
    Logger.log("Could not find active UI host.");
  }
}

/**
 * Helper: Detects the active application context
 * allowing the Monolith to run anywhere.
 */
function getTangentUi_() {
  try {
    return SpreadsheetApp.getUi();
  } catch (e) {}
  try {
    return DocumentApp.getUi();
  } catch (e) {}
  try {
    return SlidesApp.getUi();
  } catch (e) {}
  try {
    return FormApp.getUi();
  } catch (e) {}
  return null;
}

/**
 * Central router function to handle UI actions
 * @param {string} action - The action to perform
 * @param {Object} payload - Optional payload data
 * @returns {Object} Response object
 */
function route(action, payload) {
  try {
    var user = Session.getActiveUser().getEmail();

    // 1. Log the activity via Core
    TangentCore.logActivity(user, "router", action);

    // 2. Check license (Enforces Feature Flags)
    var license = TangentCore.checkLicense(user);

    // 3. Route to appropriate handler
    switch (action) {
      // --- MODULE: JANITOR ---
      case "scanShared":
        if (!license.modules.includes("cleaner")) {
          return { success: false, error: "Module not in license." };
        }
        return CleanupModule.scanSharedFiles();

      // --- MODULE: SYSTEM ---
      case "getLicense":
        return { success: true, data: license };

      default:
        TangentCore.logActivity(
          user,
          "router_error",
          "Unknown action: " + action
        );
        return { success: false, error: "Unknown action: " + action };
    }
  } catch (error) {
    console.error("Router Crash:", error);
    return {
      success: false,
      error: "System Error: " + error.toString(),
    };
  }
}

/**
 * Required for Workspace Add-on Manifests
 * Returns card objects (Stub for future Phase 3)
 */
function onHomepage(e) {
  return null;
}
