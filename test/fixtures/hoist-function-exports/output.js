var baz = function baz() {
  return false;
};

var foo = function foo() {
  return null;
};

foo.bar = baz;
export { foo as default };
export { baz };
var _default = foo,
    _baz = baz;
export function rewire($stub) {
  foo = $stub;
}
export function rewire$baz($stub) {
  baz = $stub;
}
export function restore() {
  foo = _default;
  baz = _baz;
}
