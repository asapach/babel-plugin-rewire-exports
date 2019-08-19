function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var foo = function foo() {
  _classCallCheck(this, foo);

  this.foo = 'bar';
};

export { foo as default };
var _default = foo;
export function rewire($stub) {
  foo = $stub;
}
export function restore() {
  foo = _default;
}