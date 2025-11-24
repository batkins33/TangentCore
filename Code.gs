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
      .addItem("TF Utilities", "showSidebar")
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

// ========== PUBLIC API FUNCTIONS (For Client-Side Calls) ==========

/**
 * Public API: Scan shared files
 * Called from Sidebar.html via google.script.run
 * @returns {Object} Scan results with file data
 */
function apiScanSharedFiles() {
  try {
    var user = Session.getActiveUser().getEmail();
    TangentCore.logActivity(user, "api", "apiScanSharedFiles");

    var result = CleanupModule.scanSharedFiles();

    // Return the data directly for client consumption
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/**
 * Public API: Dismiss files from "Shared With Me"
 * Called from Sidebar.html via google.script.run
 * @param {Array<string>} fileIds - Array of file IDs to dismiss
 * @returns {Object} Batch dismissal results
 */
function apiDismissFiles(fileIds) {
  try {
    var user = Session.getActiveUser().getEmail();
    TangentCore.logActivity(
      user,
      "api",
      "apiDismissFiles: " + fileIds.length + " files"
    );

    var result = DismissModule.dismissBatch(fileIds);

    // Return the data for client consumption
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// ========== ROUTER (For Legacy Compatibility) ==========

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

      // --- MODULE: MANIFEST ---
      case "generateManifest":
        // License check: 'free' tier is allowed, so just proceed
        // (If you had a premium check, it would go here)
        return ManifestModule.generateManifest();

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

// ========== DRIVE ADD-ON HANDLERS ==========

/**
 * Drive Homepage: Shown when user opens Drive add-on
 * @param {Object} e - Event object
 * @returns {Card} CardService card
 */
function onDriveHomepage(e) {
  var card = CardService.newCardBuilder()
    .setHeader(
      CardService.newCardHeader()
        .setTitle("Tangent Forge Utilities")
        .setImageUrl(
          "https://www.gstatic.com/images/branding/product/1x/drive_48dp.png"
        )
    )
    .addSection(
      CardService.newCardSection()
        .setHeader("TF Site Survey")
        .addWidget(
          CardService.newTextParagraph().setText(
            "Scan shared files and safely dismiss clutter."
          )
        )
        .addWidget(
          CardService.newTextButton()
            .setText("Launch Survey")
            .setOnClickAction(
              CardService.newAction().setFunctionName("showSidebar")
            )
        )
    )
    .build();

  return [card];
}

/**
 * Drive Items Selected: Shown when user selects items in Drive
 * @param {Object} e - Event object
 * @returns {Card[]} Array of CardService cards
 */
function onDriveItemsSelected(e) {
  var items = e.drive.selectedItems;

  // Check if exactly 1 item is selected
  if (!items || items.length !== 1) {
    return buildErrorCard("Please select exactly one folder.");
  }

  var item = items[0];

  // Check if it's a folder
  if (item.mimeType !== "application/vnd.google-apps.folder") {
    return buildErrorCard("Please select a folder (not a file).");
  }

  // Build the manifest card for the selected folder
  var card = CardService.newCardBuilder()
    .setHeader(
      CardService.newCardHeader()
        .setTitle("Generate Manifest")
        .setSubtitle(item.title)
        .setImageUrl(
          "https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png"
        )
    )
    .addSection(
      CardService.newCardSection()
        .setHeader("Project Manifest Generator")
        .addWidget(
          CardService.newTextParagraph().setText(
            "Create a spreadsheet listing all files in this folder."
          )
        )
        .addWidget(
          CardService.newTextButton()
            .setText("Generate Manifest")
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName("generateManifestForFolder")
                .setParameters({ folderId: item.id })
            )
        )
    )
    .build();

  return [card];
}

/**
 * Helper: Build error card
 * @param {string} message - Error message
 * @returns {Card[]} Array with error card
 */
function buildErrorCard(message) {
  var card = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Tangent Forge"))
    .addSection(
      CardService.newCardSection().addWidget(
        CardService.newTextParagraph().setText(message)
      )
    )
    .build();

  return [card];
}

/**
 * Action handler for generating manifest from Drive context
 * @param {Object} e - Event object with parameters
 * @returns {CardService.ActionResponse} Action response
 */
function generateManifestForFolder(e) {
  var folderId = e.parameters.folderId;

  try {
    var result = ManifestModule.generateManifestForFolder(folderId);

    if (result.success) {
      var notification = CardService.newNotification().setText(
        "✓ Manifest created successfully!"
      );

      var actionResponse = CardService.newActionResponseBuilder()
        .setNotification(notification)
        .setOpenLink(
          CardService.newOpenLink()
            .setUrl(result.url)
            .setOpenAs(CardService.OpenAs.FULL_SIZE)
        )
        .build();

      return actionResponse;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    var notification = CardService.newNotification().setText(
      "Error: " + error.message
    );

    return CardService.newActionResponseBuilder()
      .setNotification(notification)
      .build();
  }
}
