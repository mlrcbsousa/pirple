/*
 * This is the Stripe integration service
 *
 *
 */

// Dependencies
const config = require("../config");
const { parseJsonToObject } = require("../helpers");
const https = require("https");
const querystring = require("querystring");

const successStatus = status => [200, 201].includes(status);

// Process payment with Stripe
function processPayment(amount, { number, expMonth, expYear, cvc }, callback){

  // Configure the request details
  const options = {
    protocol: "https:",
    hostname: "api.stripe.com",
    method: "POST",
    auth: `${config.stripe.secretKey}:`,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };

  // Configure the token request payload
  const tokenStringPayload = querystring.stringify({
    'card[number]': number,
    'card[exp_month]': expMonth,
    'card[exp_year]': expYear,
    'card[cvc]': cvc,
  });

  options.path = "/v1/tokens";
  options.headers["Content-Length"] = Buffer.byteLength(tokenStringPayload);

  // Instantiate the token request
  const tokenReq = https.request(options, function(res){

    // Grab status from response
    const tokenResStatus = res.statusCode

    // Callback successfully if the request went through
    if(successStatus(tokenResStatus)){

      // Parse and read response
      res.setEncoding('utf8');
      res.on('data', chunk => {
        // Parse string response
        const tokenId = parseJsonToObject(chunk).id;

        // Configure the token request payload
        const chargeStringPayload = querystring.stringify({
          amount,
          currency: 'eur',
          // Extract token id from token response
          source: tokenId,
        });

        options.path = "/v1/charges";
        options.headers["Content-Length"] = Buffer.byteLength(chargeStringPayload);

        // Create charge using order information using stripe service
        const chargeReq = https.request(options, function(res){

          // Grab status from response
          const chargeResStatus = res.statusCode

          // Callback successfully if the request went through
          if(successStatus(chargeResStatus)){

            // Parse and read response
            res.setEncoding('utf8');
            res.on('data', chunk => {
              // Parse string response
              const chargeStatus = parseJsonToObject(chunk).status;

              // Callback successfully if charge succeeded
              if(chargeStatus === 'succeeded'){
                callback(false);
              } else {
                callback(`Failed to charge payment successfully. Charge status returned was ${chargeStatus}`);
              };
            });

          } else {
            callback(`Failed charge request. Status code returned was ${chargeResStatus}`);
          };
        });

        // Bind to the error event so it doesn't get thrown
        chargeReq.on("error", e => callback(e));

        // Add the payload
        chargeReq.write(chargeStringPayload);

        // End the request
        chargeReq.end();
      });

    } else {
      callback(`Failed token request. Status code returned was ${tokenResStatus}`);
    };
  });

  // Bind to the error event so it doesn't get thrown
  tokenReq.on("error", e => callback(e));

  // Add the payload
  tokenReq.write(tokenStringPayload);

  // End the request
  tokenReq.end();
};

// Export the module
module.exports = {
  processPayment
};
