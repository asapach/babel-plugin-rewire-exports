var foo;
export { foo as bar };
var _foo = foo;

function restore() {
  foo = _foo;
}

export { restore };