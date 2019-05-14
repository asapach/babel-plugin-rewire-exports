var foo = _foo,
    bar = _bar;

function _foo() {
  return bar();
}

export { foo as default };

function* _bar() {
  yield baz;
}

export { bar };
var baz = true;
export { bar as qux, baz };
var whatsit = class whatsit extends foo {};
export { whatsit };
var _qux = bar,
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
export function restore() {
  foo = _foo;
  bar = _bar;
  bar = _qux;
  baz = _baz;
  whatsit = _whatsit;
}
