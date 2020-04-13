/*
 * These are the Request Handlers for Items
 *
 *
 */

// Dependencies
const _db = require("../data");
const { tokenValidation } = require("../validators");

// Items list
const menu = {
  PZ814: { name: 'margherita', price: 650 },
  PZ377: { name: 'vegetarian', price: 650 },
  PZ927: { name: 'melanzana', price: 650 },
  PZ136: { name: 'funghi', price: 700 },
  PZ145: { name: 'parmigiana', price: 700 },
  PZ045: { name: 'reine', price: 700 },
  PZ616: { name: 'campione', price: 750 },
  PZ866: { name: 'oriental', price: 750 },
  PZ693: { name: '4 seasons', price: 800 },
};

// Items - get list
// Required data: token
// Optional data: none
function get({ headers: { token } }, callback){
  // Check that the token is valid
  token = tokenValidation(token) ? token.trim() : false;

  if(token){
    // Lookup the token
    _db.read("tokens", token, function(err, tokenData){
      if(!err && tokenData){
        // Check that the token has not expired
        tokenData.expires > Date.now()
          ? callback(200, menu)
          : callback(403, { "Error": "Token has expired" });
      } else {

        callback(404, { "Error": "Token not found" });
      };
    });
  } else {
    callback(400, { "Error": "Missing required token in headers" });
  };
};

// Export the module
module.exports = {
  get,
  menu
};