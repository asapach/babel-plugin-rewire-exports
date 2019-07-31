var foo = _foo;

function _foo() {
  return null;
}

export { foo as default };
export function rewire($stub) {
  foo = $stub;
}
export function restore() {
  foo = _foo;
}