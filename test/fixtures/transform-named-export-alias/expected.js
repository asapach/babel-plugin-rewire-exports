var foo;
export { foo as bar };
var _bar = foo;
export function restore() {
  foo = _bar;
}