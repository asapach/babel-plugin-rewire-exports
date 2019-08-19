"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire = rewire;
exports.restore = restore;
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = function _default() {
  _classCallCheck(this, _default);

  this.foo = 'bar';
};

exports["default"] = _default;
var _default2 = _default;

function rewire($stub) {
  exports["default"] = _default = $stub;
}

function restore() {
  exports["default"] = _default = _default2;
}