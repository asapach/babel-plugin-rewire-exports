export const foo = 'bar';

const baz = false;
export { _baz as baz };
var _baz = baz;
var _baz2 = _baz;
export function rewire$baz($stub) {
  _baz = $stub;
}
export function restore() {
  _baz = _baz2;
}