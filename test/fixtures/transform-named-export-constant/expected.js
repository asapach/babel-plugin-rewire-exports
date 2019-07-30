export const foo = 'bar';
const baz = false;
var _baz = baz;
export { _baz as baz };
var _baz2 = _baz;
export function rewire$baz($stub) {
  _baz = $stub;
}
export function rewire$foo() {
  throw new Error('Named constant exports cannot be rewired, see https://github.com/asapach/babel-plugin-rewire-exports#limitations');
}
export function restore() {
  _baz = _baz2;
}
