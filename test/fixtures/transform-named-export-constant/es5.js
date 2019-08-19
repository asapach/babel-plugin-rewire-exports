var foo = 'bar',
    baz = 'qux';
export { foo, baz };
var whatsit = false;
export { whatsit };
var _whatsit = whatsit,
    _foo = foo,
    _baz = baz;
export function rewire$whatsit($stub) {
  whatsit = $stub;
}
export function rewire$foo($stub) {
  foo = $stub;
}
export function rewire$baz($stub) {
  baz = $stub;
}
export function restore() {
  whatsit = _whatsit;
  foo = _foo;
  baz = _baz;
}