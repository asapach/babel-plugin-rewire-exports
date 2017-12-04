var _undefined = undefined;
export { _undefined as bar };
var _bar = _undefined;
export function rewire$bar($stub) {
  _undefined = $stub;
}
export function restore() {
  _undefined = _bar;
}