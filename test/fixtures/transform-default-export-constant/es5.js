var foo = 1;
export { foo as default };
var _default = foo;
export function rewire($stub) {
  foo = $stub;
}
export function restore() {
  foo = _default;
}