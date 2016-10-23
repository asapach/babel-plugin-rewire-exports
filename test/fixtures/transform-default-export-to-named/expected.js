var foo;
export { foo as default };
var _default = foo;
export function restore() {
  foo = _default;
}