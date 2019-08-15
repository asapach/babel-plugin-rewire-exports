var foo = function foo(_ref) {
  var text = _ref.text;
  return text;
},
    bar = function bar(baz) {
  return baz;
};

export { foo as default };
export { bar };
var _default = foo,
    _bar = bar;
export function rewire($stub) {
  foo = $stub;
}
export function rewire$bar($stub) {
  bar = $stub;
}
export function restore() {
  foo = _default;
  bar = _bar;
}
