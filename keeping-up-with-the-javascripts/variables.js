/*
 * Differences between `var`, `let` and `const`
 *
 *
 */

// 'var' is ES5 or earlier and is a variable assignment that 'leaks' out of scope,
// it can be assigned inside a block and accessed outside that block, given it is still inside the
// same function scope. So to some up a 'var' assignment is scoped to a function no matter
// how deeply it is nested within that function.

function greetingA(){
  var inEnglish = true;
  if(inEnglish){
    if (!inEnglish || true) {
      if (inEnglish) {
        var hello = 'Hello!';
      };
    };
  };
  console.log(hello);
};
greetingA(); //-> Hello!

// if the assignment isn't done, the declaration is still read and no error will throw
// giving the result of 'undefined'
function greetingB(){
  var inEnglish = false;
  if(inEnglish){
    if (!inEnglish || true) {
      if (inEnglish) {
        var hello = 'Hello!';
      };
    };
  };
  console.log(hello);
};
greetingB(); //-> undefined

// if the variable declaration isn't done then an error will throw, giving the result of 'undefined'
function greetingC(){
  var inEnglish = false;
  if(inEnglish){
    if (!inEnglish || true) {
      if (inEnglish) {
      };
    };
  };
  console.log(hello);
};
greetingC(); //-> throws "ReferenceError: hello is not defined"

// This obviously leads to alot of headaches and so ES6 comes with the variable assignment 'let'
// 'let' is scoped to the block rather then a function and so is not accessible outside the block scope where
// is was defined.

function greetingD(){
  var inEnglish = false;
  if(inEnglish){
    if (!inEnglish || true) {
      if (inEnglish) {
        let hello = 'Hello!';
      };
    };
  };
  console.log(hello);
};
greetingD(); //-> throws "ReferenceError: hello is not defined"

// both 'let' and 'var' can be used to declare variables without a value assigned to them
var turkey;
let beans;

// Finally 'const' is used to assign a constant, it can not be reassigned and it can not be declared
// wihtout a value assignment

const potato; //-> throws "SyntaxError: Missing initializer in const declaration"

const gardenHerb = "Thyme";
gardenHerb = "Parsley"; //-> throws "TypeError: Assignment to constant variable."

// You can however mutate a constant, as in change it's contents, which is relevatn when considering objects
// a variable assignment to an object can't be reassigned if it is a 'const' declaration but the contents of
// that object can be added to
const lib = {};
lib.gardenHerb = 'Paradise Lost';
console.log(lib); //-> { gardenHerb: 'Paradise Lost' }
lib.gardenHerb = 'Parsley';
console.log(lib); //-> { gardenHerb: 'Parsley' }

lib = {}; //-> throws "TypeError: Assignment to constant variable."

// 'const' is also scoped to the block and not the function, just like 'let'