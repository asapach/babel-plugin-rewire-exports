var _default = function foo() {
  return bar();
};

export { _default as default };

var bar = function bar() {
  return baz;
};

export { bar };


var baz = true;

export { bar as qux, baz };
var _default2 = _default,
    _bar = bar,
    _qux = bar,
    _baz = baz;
export function rewire($stub) {
  _default = $stub;
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
export function restore() {
  _default = _default2;
  bar = _bar;
  bar = _qux;
  baz = _baz;
}