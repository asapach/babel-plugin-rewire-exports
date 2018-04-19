var foo = _foo;

function _foo() {
  return null;
}

export { foo };
export function rewire$foo($stub) {
  foo = $stub;
}
export function restore() {
  foo = _foo;
}