const foo = 'bar',
      baz = 'qux';
var _foo = foo;
var _baz = baz;
export { _foo as foo, _baz as baz };
const whatsit = false;
var _whatsit = whatsit;
export { _whatsit as whatsit };
var _whatsit2 = _whatsit,
    _foo2 = _foo,
    _baz2 = _baz;
export function rewire$whatsit($stub) {
  _whatsit = $stub;
}
export function rewire$foo($stub) {
  _foo = $stub;
}
export function rewire$baz($stub) {
  _baz = $stub;
}
export function restore() {
  _whatsit = _whatsit2;
  _foo = _foo2;
  _baz = _baz2;
}
