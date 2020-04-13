/*
 * These are the Request Handlers for Orders
 *
 *
 */

// Dependencies
const _db = require("../data");
const { authenticateUser } = require("../auth");
const { calculateTotal, createRandomString } = require("../helpers");
const { cardValidation } = require("../validators");
const { processPayment } = require("../services/stripe");
const { emailReceipt } = require("../services/mailgun");

// Orders - post
// Required data: email, token, number, expMonth, expYear, cvc
// Optional data: none
function post({
  payload: { email, ...card },
  headers: { token }
}, callback){

  authenticateUser(email, token, function(statusCode, data){
    if(statusCode == 200){

      // Get the cart on the found user or an empty array if none is there already
      const shoppingCart = data.shoppingCart ? data.shoppingCart : [];
      const totalAmount = calculateTotal(shoppingCart);

      if(totalAmount !== 0){
        card = cardValidation(card) ? card : false
        if(card) {

          // Send to Payment Processing service
          processPayment(totalAmount, card, function(err){
            // On success create order and send success email
            if(!err){

              // Create Id for order
              const orderId = createRandomString(20);

              // Create order
              orderObject = {
                id: orderId,
                total: totalAmount,
                details: shoppingCart,
                userEmail: email,
                timestamp: Date.now(),
                // To keep track of email sending state
                emailSent: false,
              };

              // Store the order
              _db.create("orders", orderId, orderObject, function(err){
                if(!err){
                  // Email receipt to user
                  emailReceipt(data, orderObject);

                  // Reset user's shopping cart
                  delete data.shoppingCart;

                  // Get the orders list on the found user or an empty array if none is there already
                  data.orders = data.orders || [];

                  // Add order to orders array on user
                  data.orders.push(orderId);

                  // Store the new updates
                  _db.update("users", email, data, function(err){
                    if(!err){
                      callback(200, orderObject);
                    } else {
                      console.log(err);
                      callback(500, { "Error": "Could not update the user with the new order" });
                    };
                  });

                } else {
                  callback(500, { "Error": "Could not create the new order" })
                };
              });

            } else {
              console.log(err);
              callback(400, { "Error": "Payment processing failed" });
            };
          });

        } else {
          callback(400, { "Error": "Missing required fields, or card information not valid" });
        };

      } else {
        callback(400, { "Error": "Shopping cart is empty!" })
      };

    } else {
      callback(statusCode, data);
    };
  });
};

// Order - get
// Required data: email, token
// Optional data: none
function get({ queryStringObject: { email, id }, headers: { token } }, callback){
  authenticateUser(email, token, function(statusCode, data){
    if(statusCode == 200){
      // Lookup the order
      _db.read("orders", id, function(err, orderData){
        !err && orderData ? callback(200, orderData) : callback(404);
      });
    } else {
      callback(statusCode, data);
    };
  });
};

module.exports = {
  get,
  post,
}