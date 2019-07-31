var _default = _ref;

function _ref() {
  return null;
}

export { _default as default };
export function rewire($stub) {
  _default = $stub;
}
export function restore() {
  _default = _ref;
}