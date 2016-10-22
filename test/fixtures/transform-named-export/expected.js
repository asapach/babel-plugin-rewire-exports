export var foo;
var _foo = foo;

function restore() {
  foo = _foo;
}

export { restore };