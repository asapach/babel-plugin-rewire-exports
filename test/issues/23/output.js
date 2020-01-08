const constant = 42;
var _constant = constant;
export { _constant as constant };
var _default = 'Default export';
export { _default as default };
var _default2 = _default;
export function rewire($stub) {
  _default = $stub;
}
export function rewire$constant($stub) {
  _constant = $stub;
}
export function restore() {
  _default = _default2;
  _constant = constant;
}
