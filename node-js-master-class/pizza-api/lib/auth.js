/*
 * Authentication
 *
 *
 */

// Dependencies
const _db = require("./data");
const { emailValidation, stringType } = require("./validators");

// Verify if a given token id is currently valid for a given user
function verifyToken(id, email, callback){
  // Lookup the token
  _db.read("tokens", id, function(err, tokenData){
    if(!err && tokenData){
      // Check that the token is for the given user and has not expired
      tokenData.email == email && tokenData.expires > Date.now()
        ? callback(true)
        : callback(false);
    } else {
      callback(false);
    };
  });
};

// Authenticate request based on email and token
function authenticateUser(email, token, callback) {

  // Validate email
  email = emailValidation(email) ? email.trim() : false;

  // Error if the email is invalid
  if(email){

    // Basic string validation of token, verifyToken validates the token more
    token = stringType(token) ? token : false;

    // Verify that the given token is valid for the email
    verifyToken(token, email, function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _db.read("users", email, function(err, userData){
          if(!err && userData){
            callback(200, userData);
          } else {
            callback(404, { "Error": "The specified user does not exist" });
          };
        });
      } else {
        callback(403, { "Error": "Missing required token in header, or token is invalid" });
      };
    });

  } else {
    callback(400, { "Error": "Missing required email field" });
  };
};

// Export the module
module.exports = { authenticateUser };