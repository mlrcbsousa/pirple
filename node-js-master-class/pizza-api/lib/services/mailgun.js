/*
 * This is the Mailgun integration service
 *
 *
 */

// Dependencies
const _db = require("../data");
const { mailgun } = require("../config");
const https = require("https");
const querystring = require("querystring");
const { menu } = require("../handlers/items");
const url = require("url");

function emailReceipt({ email, name }, order){
  let { timestamp, details, id, total } = order;

  const date = new Date(timestamp).toISOString()

  details = details.map(({ item, quantity }) =>
    `${menu[item].name.toUpperCase()} - ${quantity} x ${menu[item].price / 100}€`)

  const emailBody = [
    `Thank you ${name} for shopping with Pizza Ltd!`,
    "\n",
    `Your order: ${id} has been processed successfully.`,
    "\n",
    "Order details:",
    "\n",
    `On: ${date.slice(0, 10)}`,
    `At: ${date.slice(11, 16)}`,
    "\n",
    `${details.join("\n")}`,
    "\n",
    `Total: ${total / 100}€`
  ].join("\n")

  // Configure the request payload
  const payload = querystring.stringify({
    from: `Mailgun Sandbox <postmaster@${mailgun.domain}>`,
    to: email,
    subject: `Your Receipt for Order: ${id}`,
    text: emailBody
  });

  // Parse the hostname and the path out of the api configuration data
  const parsedUrl = url.parse(`https://api.mailgun.net/v3/${mailgun.domain}/messages`);
  const hostname = parsedUrl.hostname;
  const path = parsedUrl.pathname;

  // Configure the request details
  const options = {
    protocol: "https:",
    hostname,
    method: "POST",
    auth: `api:${mailgun.authToken}`,
    path,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, function({ statusCode }){

    if(statusCode === 200){
      // Update order with email sent if the request went through
      order.emailSent = true;

      _db.update("orders", id, order, function(err){
        if(!err){
          console.log("\x1b[32m%s\x1b[0m", `Email Receipt successfully sent for order: ${id} to: ${email}`);
        } else {
          console.log("\x1b[31m%s\x1b[0m", `Error: email sending failed for order: ${id} with status: ${statusCode}`);
        };
      });

    } else {
      console.log("\x1b[31m%s\x1b[0m", `Error: email sending failed for order: ${id} with status: ${statusCode}`);
    };
  });

  // Bind to the error event so it doesn't get thrown
  req.on("error", e => console.log(e));

  // Add the payload
  req.write(payload);

  // End the request
  req.end();
};

// Export the module
module.exports = {
  emailReceipt
};
