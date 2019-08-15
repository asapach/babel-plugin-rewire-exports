var foo = function foo() {
  return bar();
},
    bar = function* bar() {
  yield baz;
};

export { foo as default };
export { bar };
var baz = true;
export { bar as qux, baz };
var whatsit = class whatsit extends foo {};
export { whatsit };
const whatnot = false,
      whatever = true;
var _whatnot = whatnot;
var _whatever = whatever;
export { _whatnot as whatnot, _whatever as whatever };
var _default = foo,
    _bar = bar,
    _qux = bar,
    _baz = baz,
    _whatsit = whatsit;
export function rewire($stub) {
  foo = $stub;
}
export function rewire$bar($stub) {
  bar = $stub;
}
export function rewire$qux($stub) {
  bar = $stub;
}
export function rewire$baz($stub) {
  baz = $stub;
}
export function rewire$whatsit($stub) {
  whatsit = $stub;
}
export function rewire$whatnot($stub) {
  _whatnot = $stub;
}
export function rewire$whatever($stub) {
  _whatever = $stub;
}
export function restore() {
  foo = _default;
  bar = _bar;
  bar = _qux;
  baz = _baz;
  whatsit = _whatsit;
  _whatnot = whatnot;
  _whatever = whatever;
}
