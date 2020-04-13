/*
 * These are the Request Handlers for Cart
 *
 *
 */

// Dependencies
const _db = require("../data");
const { authenticateUser } = require("../auth");
const { calculateTotal } = require("../helpers");
const { menu } = require("./items");

// Container for the Users submethods
const cart = {};

// Cart - patch
// Required data: email, token, [{ item, quantity }]
// Optional data: none
cart.patch = function({ payload, queryStringObject: { email }, headers: { token } }, callback){
  authenticateUser(email, token, function(statusCode, data){
    if(statusCode == 200){

      // Validate the new items in the cart
      validItems = payload.every(({ item, quantity }) => menu[item] && Number.isInteger(quantity) && quantity >= 0);
      const shoppingCart = Array.isArray(payload) && payload.length && validItems
        ? payload
        : false

      if(shoppingCart){
        // Get the cart on the found user or an empty array if none is there already
        const userCart = data.shoppingCart ? data.shoppingCart : [];

        const updatedCart = shoppingCart.reduce((cart, cartItem) => {
          const { item, quantity } = cartItem;

          // Find item in current cart
          const index = userCart.findIndex(cartItem => cartItem.item === item);

          if(quantity && index > -1){
            // Replace the new items in the user cart
            cart.splice(index, 1, cartItem);
          } else if(quantity) {
            // Add the new items to the cart
            cart.push(cartItem);
          } else if(quantity === 0 && index > -1){
            // Remove any items with quantity 0 found in the user cart
            cart.splice(index, 1);
          };
          return cart;
        }, userCart);

        data.shoppingCart = updatedCart;

        // Update the user cart
        _db.update("users", email, data, function(err){
          if(!err){
            // Calculate the total price of the shopping cart
            const total = calculateTotal(updatedCart);

            // Add the total to the returned object
            callback(200, { shoppingCart: updatedCart, total });

          } else {
            console.log(err);
            callback(500, { "Error": "Could not update the shopping cart" });
          };
        });
      } else {
        callback(400, { "Error": "No items to update or items in the cart are not valid" });
      };
    } else {
      callback(statusCode, data);
    };
  });
};

// Cart - get
// Required data: email, token
// Optional data: none
cart.get = function({ queryStringObject: { email }, headers: { token } }, callback){
  authenticateUser(email, token, function(statusCode, data){
    if(statusCode == 200){

      // Get the cart on the found user or an empty array if none is there already
      const shoppingCart = data.shoppingCart ? data.shoppingCart : [];

      // Calculate the total price of the shopping cart
      const total = calculateTotal(shoppingCart);

      // Add the total to the returned object
      callback(200, { shoppingCart, total });

    } else {
      callback(statusCode, data);
    };
  });
};

// Cart - delete
// Required data: email, token
// Optional data: none
cart.delete = function({ queryStringObject: { email }, headers: { token } }, callback){
  authenticateUser(email, token, function(statusCode, data){
    if(statusCode == 200){

      // Delete the user's cart
      delete data.shoppingCart;

      // Update the saved user object
      _db.update("users", email, data, function(err){
        if(!err){
          callback(200);
        } else {
          console.log(err);
          callback(500, { "Error": "Could not delete the shopping cart" });
        };
      });

    } else {
      callback(statusCode, data);
    };
  });
};

// Export the module
module.exports = cart;