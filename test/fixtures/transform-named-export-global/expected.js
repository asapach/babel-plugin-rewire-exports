export { _foo as bar };
var _foo = foo;
var _bar = _foo;
export function rewire$bar($stub) {
  _foo = $stub;
}
export function restore() {
  _foo = _bar;
}