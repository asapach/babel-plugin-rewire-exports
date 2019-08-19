function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = function _default() {
  _classCallCheck(this, _default);

  this.foo = 'bar';
};

export { _default as default };
var _default2 = _default;
export function rewire($stub) {
  _default = $stub;
}
export function restore() {
  _default = _default2;
}