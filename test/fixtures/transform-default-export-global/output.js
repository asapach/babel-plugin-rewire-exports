var _default = foo;
export { _default as default };
var _default2 = _default;
export function rewire($stub) {
  _default = $stub;
}
export function restore() {
  _default = _default2;
}