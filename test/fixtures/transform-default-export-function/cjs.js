"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire = rewire;
exports.restore = restore;
exports["default"] = void 0;

var _default = function _default() {
  return null;
};

exports["default"] = _default;
var _default2 = _default;

function rewire($stub) {
  exports["default"] = _default = $stub;
}

function restore() {
  exports["default"] = _default = _default2;
}