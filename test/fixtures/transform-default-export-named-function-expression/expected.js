var _default = function foo() {
  return null;
};

export { _default as default };
var _default2 = _default;
export function rewire$default($stub) {
  _default = $stub;
}
export function restore() {
  _default = _default2;
}