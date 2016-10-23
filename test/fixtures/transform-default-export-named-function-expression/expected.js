var foo = function foo() {
  return null;
};

export { foo as default };
var _default = foo;
export function restore() {
  foo = _default;
}