var rewire = _rewire,
    restore = _restore;

function _rewire() {
  return restore();
}

export { rewire as default };

function _restore() {}

export { restore };
export function rewire$default($stub) {
  rewire = $stub;
}
export function rewire$restore($stub) {
  restore = $stub;
}
export function restore$rewire() {
  rewire = _rewire;
  restore = _restore;
}