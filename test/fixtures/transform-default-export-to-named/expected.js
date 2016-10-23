var foo;
export { foo as default };
var _default = foo;
export function rewire$default($stub) {
  foo = $stub;
}
export function restore() {
  foo = _default;
}