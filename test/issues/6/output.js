let foo = 1;
export { foo };
export { foo as default };
export let bar = 'baz';
var _foo = foo,
    _default = foo,
    _bar = bar;
export function rewire$foo($stub) {
  foo = $stub;
}
export function rewire($stub) {
  foo = $stub;
}
export function rewire$bar($stub) {
  bar = $stub;
}
export function restore() {
  foo = _foo;
  foo = _default;
  bar = _bar;
}
