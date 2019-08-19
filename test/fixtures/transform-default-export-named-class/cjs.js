"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire = rewire;
exports.restore = restore;
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var foo = function foo() {
  _classCallCheck(this, foo);

  this.foo = 'bar';
};

exports["default"] = foo;
var _default = foo;

function rewire($stub) {
  exports["default"] = foo = $stub;
}

function restore() {
  exports["default"] = foo = _default;
}