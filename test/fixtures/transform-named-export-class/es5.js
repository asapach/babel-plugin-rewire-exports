function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var foo = function foo() {
  _classCallCheck(this, foo);

  this.foo = 'bar';
};

export { foo };
var _foo = foo;
export function rewire$foo($stub) {
  foo = $stub;
}
export function restore() {
  foo = _foo;
}