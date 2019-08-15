var rewire = function rewire() {
  return restore();
},
    restore = function restore() {};

export { rewire as default };
export { restore };
var _default = rewire,
    _restore = restore;
export function rewire$default($stub) {
  rewire = $stub;
}
export function rewire$restore($stub) {
  restore = $stub;
}
export function restore$rewire() {
  rewire = _default;
  restore = _restore;
}
