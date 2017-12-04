import foo from './bar.js';
foo.baz = 'qux';
var _foo = foo;
export { _foo as foo };
var _default = foo;
export { _default as default };
var _foo2 = _foo,
    _default2 = _default;
export function rewire$foo($stub) {
  _foo = $stub;
}
export function rewire($stub) {
  _default = $stub;
}
export function restore() {
  _foo = _foo2;
  _default = _default2;
}