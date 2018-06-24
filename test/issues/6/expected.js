const foo = 1;
var _foo = foo;
export { _foo as foo };
var _default = foo;
export { _default as default };

export let bar = 'baz';
var _foo2 = _foo,
    _default2 = _default,
    _bar = bar;
export function rewire$foo($stub) {
  _foo = $stub;
}
export function rewire($stub) {
  _default = $stub;
}
export function rewire$bar($stub) {
  bar = $stub;
}
export function restore() {
  _foo = _foo2;
  _default = _default2;
  bar = _bar;
}