var foo = function foo() {
  return null;
};

export { foo as default };
var _default = foo;

function restore() {
  foo = _default
}

export { restore };