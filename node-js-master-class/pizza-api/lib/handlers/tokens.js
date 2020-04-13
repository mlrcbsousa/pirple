/*
 * These are the Request Handlers for Tokens
 *
 *
 */

// Dependencies
const _db = require("../data");
const helpers = require("../helpers");
const { tokenValidation, stringAndPresent, emailValidation } = require("../validators");

// Container for the Users submethods
const tokens = {};

// Tokens - post
// Required data: email, password
// Optional data: none
tokens.post = function({ payload: { email, password } }, callback){
  email = emailValidation(email) ? email.trim() : false;
  password = stringAndPresent(password) ? password.trim() : false;

  if(email && password){
    // Lookup user that matches that email
    _db.read("users", email, function(err, userData){
      if(!err && userData){
        // Hash the sent password, and compare it to the password stored in the user object
        const hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid create a new token with a random name. Set expiration date one hour in the future
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + 1000 * 60 * 60;
          const tokenObject = {
            email,
            id: tokenId,
            expires,
          };

          // Store the token
          _db.create("tokens", tokenId, tokenObject, function(err){
            err
              ? callback(500, { "Error": "Could not create the new token" })
              : callback(200, tokenObject);
          });
        } else {
          callback(400, { "Error": "Password did not match the specified user's stored password" })
        };
      } else {
        callback(400, { "Error": "Could not find the specified user" });
      };
    })
  } else {
    callback(400, { "Error": "Missing required fields" })
  }
};

// Tokens - get
// Required data: id
// Optional data: none
tokens.get = function({ queryStringObject: { id } }, callback){
  // Check that the Id is valid
  id = tokenValidation(id) ? id.trim() : false;
  if(id){
    // Lookup the token
    _db.read("tokens", id, function(err, tokenData){
      !err && tokenData ? callback(200, tokenData) : callback(404);
    });
  } else {
    callback(400, { "Error": "Missing required fields" });
  };
};

// Tokens - delete
// Required data: id
// Optional data: none
tokens.delete = function({ queryStringObject: { id } }, callback){
  // Check that the Id number is valid
  id = tokenValidation(id) ? id.trim() : false;
  if(id){
    // Lookup the token
    _db.read("tokens", id, function(err, data){
      if(!err && data){
        _db.delete("tokens", id, function(err){
          err ? callback(500, { "Error": "Could not delete the specified token" }) : callback(200);
        });
      } else {
        callback(400, { "Error": "Could not find the specified token" });
      }
    });
  } else {
    callback(400, { "Error": "Missing required fields" });
  };
};

// Export the module
module.exports = tokens;