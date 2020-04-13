/*
 * Homework Assignment #1 for The Node.js Master Class
 *
 *
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// Instantiate the HTTP server
const httpServer = http.createServer(function(req, res){
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
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined'
      ? router[trimmedPath]
      : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
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

       // Log the request path
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
});

// Start the HTTP server
httpServer.listen(4567, function(){
  console.log("The server is listening on port 4567");
});

// Define the handlers
const handlers = {};

// Ping handler
handlers.hello = function(data, callback) {
  // Callback a http status code, and a payload object
  callback(201, { greeting: "Hello World!" });
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
};

// Define a request router
const router = {
  hello: handlers.hello,
};