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
    _bar2 = bar,
    _baz = baz;
export function restore() {
  _default = _default2;
  bar = _bar;
  bar = _bar2;
  baz = _baz;
}