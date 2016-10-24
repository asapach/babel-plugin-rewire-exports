var foo = _foo;
var baz = _baz;
foo.bar = baz;

function _foo() {
  return null;
}

export { foo as default };
function _baz() {
  return false;
}
export { baz };
var _default = foo,
    _baz2 = baz;
export function rewire($stub) {
  foo = $stub;
}
export function rewire$baz($stub) {
  baz = $stub;
}
export function restore() {
  foo = _default;
  baz = _baz2;
}