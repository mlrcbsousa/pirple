/*
 * These are server related tasks
 *
 *
 */

// Dependencies
const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const handlers = require("./handlers");
const helpers = require("./helpers");
const path = require("path");
// const util = require("util");
// const debug = util.debuglog("server");

// Instantiate the server module object
const server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer(function(req, res){
  server.unifiedServer(req, res);
});

// Instantiate the HTTPS server
server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, "/../https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/../https/cert.pem")),
};
server.httpsServer = https.createServer(server.httpsServerOptions, function(req, res){
  server.unifiedServer(req, res);
});

// All the server logic for both the http and https server
server.unifiedServer = function(req, res){

  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get he payload if there is any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function(data){
    buffer += decoder.write(data);
  });
  req.on("end", function(){
    buffer += decoder.end();

    // Choose the handler this request should go to.
    // If one is not found use the Not Found handler
    const chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined'
      ? server.router[trimmedPath]
      : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload){
      // Use the status code called back by the handler
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader("Content-Type", 'application/json')
      res.writeHead(statusCode);
      res.end(payloadString);

      // If the response is 200 print green otherwise print red
      if(statusCode == 200){
        console.log("\x1b[32m%s\x1b[0m", `${method.toUpperCase()} /${trimmedPath} ${statusCode}`);
      } else {
        console.log("\x1b[31m%s\x1b[0m", `${method.toUpperCase()} /${trimmedPath} ${statusCode}`);
      }
    });
  });
};

// Define a request router
server.router = {
  ping: handlers.ping,
  users: handlers.users,
  tokens: handlers.tokens,
  items: handlers.items,
  cart: handlers.cart,
  orders: handlers.orders,
};

// Init script
server.init = function(){
  // Start the HTTP server
  server.httpServer.listen(config.httpPort, function(){
    console.log("\x1b[36m%s\x1b[0m", `The server is listening on port ${config.httpPort}`);
  });

  // Start the HTTPS server
  server.httpsServer.listen(config.httpsPort, function(){
    console.log("\x1b[34m%s\x1b[0m", `The server is listening on port ${config.httpsPort}`);
  });
}

// Export the module
module.exports = server;