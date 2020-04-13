/*
 * These are the Request Handlers for Users
 *
 *
 */

// Dependencies
const _db = require("../data");
const helpers = require("../helpers");
const { stringAndPresent, emailValidation } = require("../validators");
const { authenticateUser } = require("../auth");

// Container for the Users submethods
const users = {};

// Users - post
// Required data: name, email, password, address
// Optional data: none
users.post = function({ payload: { name, email, address, password } }, callback){
  // Check that all required fields are filled out
  name = stringAndPresent(name) ? name.trim() : false;
  email = emailValidation(email) ? email.trim() : false;
  address = stringAndPresent(address) ? address.trim() : false;
  password = stringAndPresent(password) ? password.trim() : false;

  if(name && address && email && password){
    // Make sure that the user doesn't already exist
    _db.read("users", email, function(err, _data){
      if(err){
        // Hash the password
        const hashedPassword = helpers.hash(password);

        // Create the user object
        if(hashedPassword) {
          const userObject = {
            name,
            email,
            address,
            hashedPassword,
          };

          // Store the user
          _db.create("users", email, userObject, function(err){
            if(!err){
              delete userObject.hashedPassword;
              callback(200, userObject);
            } else {
              console.log(err);
              callback(500, { "Error": "Could not create the new user" });
            };
          });
        } else {
          callback(500, { "Error" : "Could not hash the user's password" });
        };
      } else {
        // User already exists
        callback(400, { "Error": "A user with that email already exists" });
      };
    });
  } else {
    callback(400, { "Error": "Missing required fields, or email not valid" });
  };
};

// Users - get
// Required data: email
// Optional data: none
users.get = function({ queryStringObject: { email }, headers: { token } }, callback){
  authenticateUser(email, token, function(statusCode, data){
    if(statusCode == 200){
      // Remove the hashed password from the user object before returning it to the requester
      delete data.hashedPassword;
      callback(200, data);
    } else {
      callback(statusCode, data);
    };
  });
};

// Users - put
// Required data: email
// Optional data: name, address, password (at least one must be specified)
users.put = function({ payload: { email, name, address, password }, headers: { token } }, callback){
  authenticateUser(email, token, function(statusCode, data){
    if(statusCode == 200){

      // Check for the optional fields
      name = stringAndPresent(name) ? name.trim() : false;
      address = stringAndPresent(address) ? address.trim() : false;
      password = stringAndPresent(password) ? password.trim() : false;

      // Error if nothing is sent to update
      if(name || address || password){

        // Update the fields necessary
        if(name) data.name = name;
        if(address) data.address = address;
        if(password) data.hashedPassword = helpers.hash(password);

        // Store the new updates
        _db.update("users", email, data, function(err){
          if(!err){
            delete data.hashedPassword;
            callback(200, data);
          } else {
            console.log(err);
            callback(500, { "Error": "Could not update the user" });
          };
        });

      } else {
        callback(400, { "Error": "Missing fields to update" });
      };
    } else {
      callback(statusCode, data);
    };
  });
};

// Users - delete
// Required field: email
users.delete = function({ queryStringObject: { email }, headers: { token } }, callback){
  authenticateUser(email, token, function(statusCode, data){
    if(statusCode == 200){
      _db.delete("users", email, function(err){
        if(!err){
          // TODO: Delete each of the orders associated with the user
          let { orders } = data;
          orders = Array.isArray(orders) ? orders : [];
          const ordersToDelete = orders.length;

          if(ordersToDelete > 0){
            let ordersDeleted = 0;
            let deletionErrors = false;
            // Loop through the orders
            orders.forEach(function(orderId){
              // Delete the order
              _db.delete("orders", orderId, function(err){
                if(err) deletionErrors = true;
                ordersDeleted++;

                if(ordersDeleted == ordersToDelete){
                  deletionErrors
                    ? callback(500, { "Error": "Errors encountered while attempting to delete all of the user's orders" })
                    : callback(200);
                };
              });
            });
          } else {
            callback(200);
          };
        } else {
          callback(500, { "Error": "Could not delete the specified user" });
        };
      });
    } else {
      callback(statusCode, data);
    };
  });
};

// Export the module
module.exports = users;