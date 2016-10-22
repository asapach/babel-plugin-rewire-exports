var foo = function foo() {
  return bar();
};

export { foo as default };


export function bar() {
  return baz;
}

var baz = true;

export { bar as qux, baz };
var _default = foo,
    _bar = bar,
    _baz = baz;

function restore() {
  foo = _default;
  bar = _bar;
  baz = _baz;
}

export { restore };