var foo = _foo;
foo.bar = 'baz';

function _foo() {
  return null;
}
export { foo as default };
var _default = foo;
export function rewire($stub) {
  foo = $stub;
}
export function restore() {
  foo = _default;
}