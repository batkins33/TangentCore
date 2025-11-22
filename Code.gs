/**
 * Tangent Forge Utilities - Main Entry Point
 * A professional Google Workspace Add-on with modular architecture
 */

/**
 * Creates the add-on menu when the document is opened
 * @param {Object} e - The event object
 */
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Tangent Forge')
    .addItem('Open Utilities', 'showSidebar')
    .addToUi();
}

/**
 * Opens the sidebar when the add-on homepage is triggered
 * @param {Object} e - The event object
 * @returns {Card} The homepage card
 */
function onHomepage(e) {
  showSidebar();
  return null;
}

/**
 * Displays the main sidebar interface
 */
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Tangent Forge Utilities')
    .setWidth(350);
  
  SpreadsheetApp.getUi().showSidebar(html);
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
    
    // Log the activity
    TangentCore.logActivity(user, 'router', action);
    
    // Check license
    var license = TangentCore.checkLicense(user);
    
    // Route to appropriate handler
    switch(action) {
      case 'scanShared':
        // Verify user has access to cleaner module
        if (!license.modules.includes('cleaner')) {
          return {
            success: false,
            error: 'Cleaner module not available in your tier'
          };
        }
        return CleanerModule.scanSharedFiles();
        
      case 'getLicense':
        return {
          success: true,
          data: license
        };
        
      default:
        return {
          success: false,
          error: 'Unknown action: ' + action
        };
    }
    
  } catch (error) {
    Logger.log('Router error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}
