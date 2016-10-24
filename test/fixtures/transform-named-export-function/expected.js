var foo = _foo;
function _foo() {
  return null;
}
export { foo };
var _foo2 = foo;
export function rewire$foo($stub) {
  foo = $stub;
}
export function restore() {
  foo = _foo2;
}