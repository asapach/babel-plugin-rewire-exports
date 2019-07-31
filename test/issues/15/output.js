let functionA = function () {
  const b = functionB('Test');
  return 'This is a ' + b;
};

let functionB = function (text) {
  return text.toUpperCase();
};

export { functionA, functionB };
var _functionA = functionA,
    _functionB = functionB;
export function rewire$functionA($stub) {
  functionA = $stub;
}
export function rewire$functionB($stub) {
  functionB = $stub;
}
export function restore() {
  functionA = _functionA;
  functionB = _functionB;
}
