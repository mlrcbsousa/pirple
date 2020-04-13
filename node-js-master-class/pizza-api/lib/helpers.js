/*
 * Helpers for various tasks
 *
 *
 */

// Dependencies
const crypto = require("crypto");
const config = require("./config");
const { menu } = require("./handlers/items");

// Create a SHA256 hash
function hash(str){
  if(typeof(str) == 'string' && str.length > 0){
    const hash = crypto.createHmac("sha256", config.hashingSecret).update(str).digest("hex");
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases, without throwing
function parseJsonToObject(str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch(e) {
    return {};
  }
};

// Calculate Shopping Cart total
function calculateTotal(cart) {
  return cart.reduce((total, { item, quantity }) =>
    total + menu[item].price * quantity, 0);
};

// Create a string of random alphanumeric characters, of a given length
function createRandomString(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0
    ? strLength
    : false;

  if(strLength){
    // Define all the possible characters that could go into a string
    const possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

    // Start the final string
    let str = '';
    for(i = 1; i <= strLength; i++){
      // Get a random character from the possibleCharacters string
      const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the final string
      str += randomCharacter;
    };

    // Return the final string
    return str;

  } else {
    return false;
  };
};

// Export the module
module.exports = {
  createRandomString,
  hash,
  parseJsonToObject,
  calculateTotal,
};