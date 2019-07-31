const functionA = function() {
  const b = functionB('Test');
  return 'This is a ' + b;
};

const functionB = function(text) {
  return text.toUpperCase();
};

export { functionA, functionB };
