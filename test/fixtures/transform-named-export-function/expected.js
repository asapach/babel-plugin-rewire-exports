var foo = function foo() {
  return null;
};

export { foo };
var _foo = foo;
export function restore() {
  foo = _foo;
}