/*
 * Primary file for the Pizza API
 *
 *
 */

// Dependencies
const server = require("./lib/server");
const workers = require("./lib/workers");

// Init function
function init() {
  // Start the server
  server.init();

  // Start the workers
  workers.init();
};

// Execute
init();

// Export the app
module.exports = { init };
