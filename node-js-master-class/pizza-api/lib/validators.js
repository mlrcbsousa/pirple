/*
 * Validator functions
 *
 *
 */

// Basic email validation
const _validateEmail = email => /\S+@\S+\.\S+/.test(email);

// String type validator
const stringType = str => typeof(str) == 'string';

// String type and presence validator
const stringAndPresent = str => stringType(str) && str.trim().length > 0;

// String type and email validator
const emailValidation = email => stringType(email) && _validateEmail(email.trim());

// String type and token validator
const tokenValidation = token => stringType(token) && token.trim().length == 20;

// All basic card information validations
const cardValidation = ({ number, expMonth, expYear, cvc }) => {
  // Card number is a whole number greater then 12 digits long
  number = Number.isInteger(number) && String(number).length > 12 ? number : false;

  // Expiry month is a number between 1 and 12
  expMonth = Number.isInteger(expMonth) && expMonth >= 0 && expMonth <= 12 ? expMonth : false;

  // Date object for today
  const today = new Date(Date.now());

  // Expiry year is a number greater than or equal to the current year
  expYear = Number.isInteger(expYear) && expYear >= today.getFullYear() ? expYear : false;

  // Combination of year and month is in the future
  validDate = !(expYear === today.getFullYear() && expMonth < today.getMonth() + 1);

  // CVC is a 3 digit number
  cvc = Number.isInteger(cvc) && String(cvc).length === 3 ? cvc : false;

  // Basic card validation passed
  return number && expMonth && expYear && cvc && validDate;
};

// Export the module
module.exports = {
  stringType,
  stringAndPresent,
  emailValidation,
  tokenValidation,
  cardValidation,
};