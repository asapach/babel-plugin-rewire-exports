var foo = function foo() {
  return bar();
};

export { foo as default };

var bar = function bar() {
  return baz;
};

export { bar };


var baz = true;

export { bar as qux, baz };
var _default = foo,
    _bar = bar,
    _bar2 = bar,
    _baz = baz;
export function restore() {
  foo = _default;
  bar = _bar;
  bar = _bar2;
  baz = _baz;
}