/*
 * These are worker related tasks
 *
 *
 */

// Dependencies
const _db = require("./data");
const util = require("util");
const { emailReceipt } = require("./services/mailgun");
const debug = util.debuglog("workers");

// Lookup all orders, get their email sent status and send
function checkAllOrders(){
  // Get all the orders that exist in the system
  _db.list("orders", function(err, orderIds){
    if(!err && orderIds){

      // Log if no orders to process
      if(orderIds.length) {

        orderIds.forEach(function(id){
          // Read in the order data
          _db.read("orders", id, function(err, order){
            if(!err && order){
              // Check if email needs to be sent
              if(!order.emailSent){
                // Lookup the user
                _db.read("users", order.userEmail, function(err, user){
                  if(!err && user){
                    // Attempt email sending again
                    emailReceipt(user, order);
                  } else {
                    debug("Error: could not find specific user");
                  };
                });
              };
            } else {
              debug("Error reading one of the orders data");
            };
          });
        });

      } else {
        debug("No orders to process!");
      };

    } else {
      debug("Error: Something wrong trying to find any orders to process");
    };
  });
};

// Init script
function init(){

  // Send to console, in yellow
  console.log("\x1b[33m%s\x1b[0m", "Background workers are running");

  // Attempt to send all the needed emails immediately
  checkAllOrders();

  // Loop so the emails will be sent later on
  setInterval(() => checkAllOrders(), 1000 * 10)
};

// Export the module
module.exports = {
  init
};