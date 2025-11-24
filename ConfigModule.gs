/**
 * ConfigModule - Centralized Configuration Management
 * Retrieves settings from PropertiesService with fallback defaults
 */

var ConfigModule = (function () {
  /**
   * Default configuration values
   * These are used when PropertiesService has no value set
   */
  var _defaults = {
    MAX_FILES: 500, // Default for Free Tier
  };

  /**
   * Retrieves a configuration value
   *
   * @param {string} key - The configuration key to retrieve
   * @returns {*} The configuration value (parsed if numeric)
   */
  function get(key) {
    var props = PropertiesService.getScriptProperties();
    var val = props.getProperty(key);

    // If found in ScriptProperties, return it (parsed if number)
    if (val !== null) {
      // Simple heuristic: if default is a number, parse the property as int
      if (typeof _defaults[key] === "number") {
        return parseInt(val, 10);
      }
      return val;
    }

    // Fallback to default
    return _defaults[key];
  }

  /**
   * Sets a configuration value in ScriptProperties
   *
   * @param {string} key - The configuration key
   * @param {*} value - The value to set
   */
  function set(key, value) {
    var props = PropertiesService.getScriptProperties();
    props.setProperty(key, value.toString());
  }

  /**
   * Gets all defaults (for reference)
   *
   * @returns {Object} Default configuration values
   */
  function getDefaults() {
    return _defaults;
  }

  // Public API
  return {
    get: get,
    set: set,
    getDefaults: getDefaults,
  };
})();
