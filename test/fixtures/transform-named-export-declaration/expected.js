export var foo;
var _foo = foo;
export function restore() {
  foo = _foo;
}