/*
 * Primary file for the Pizza API Handlers
 *
 *
 */

// Dependencies
const _users = require("./users");
const _tokens = require("./tokens");
const _items = require("./items");
const _cart = require("./cart");
const _orders = require("./orders");

// Acceptable Methods
const acceptableMethods = ["post", "get", "put", "delete"];

// Handler by Method
const handlerByMethod = function (data, callback, methods = acceptableMethods) {
  const { method } = data
  methods.includes(method) ? this[method](data, callback) : callback(405);
};

// Ping handler
const ping = (_data, callback) => callback(200);

// Not found handler
const notFound = (_data, callback) => callback(404);

// Users handler
const users = (...args) => handlerByMethod.call(_users, ...args);

// Tokens handler
const tokens = (...args) => handlerByMethod.call(_tokens, ...args, ["post", "get", "delete"]);

// Items handler
const items = (...args) => handlerByMethod.call(_items, ...args, ["get"]);

// Cart handler
const cart = (...args) => handlerByMethod.call(_cart, ...args, ["get", "patch", "delete"]);

// Orders
const orders = (...args) => handlerByMethod.call(_orders, ...args, ["get", "post"]);

// Export the handlers
module.exports = {
  ping,
  notFound,
  users,
  tokens,
  items,
  cart,
  orders,
};
