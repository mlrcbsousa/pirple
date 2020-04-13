/*
  Third Homework Assignment for the Pirple course Keeping Up with the Javascripts

  - Syllogism
*/

// Socrates is a man
const men = ['Socrates', 'Aristotle', 'Plato', 'Heraclitus'];

// All men are mortal
const isManMortal = man => men.includes(man);

// Therefore, socrates is mortal.
function isSocratesMortal() {
  return isManMortal('Socrates');
};

isSocratesMortal();


// Extra Credit:
function cakeIsVanilla(cake){
  // This cake is either vanilla or chocolate.
  const cakes = ['vanilla', 'chocolate'];

  // This cake is not chocolate.
  if(cakes.includes(cake) && cake !== 'chocolate'){
    // Therefore, this cake is vanilla.
    return cake == 'vanilla'
  };
};

cakeIsVanilla('vanilla');
