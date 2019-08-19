"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$foo = rewire$foo;
exports.restore = restore;
exports.foo = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var foo = function foo() {
  _classCallCheck(this, foo);

  this.foo = 'bar';
};

exports.foo = foo;
var _foo = foo;

function rewire$foo($stub) {
  exports.foo = foo = $stub;
}

function restore() {
  exports.foo = foo = _foo;
}