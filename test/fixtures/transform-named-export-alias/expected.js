var foo;
export { foo as bar };
var _foo = foo;
export function restore() {
  foo = _foo;
}