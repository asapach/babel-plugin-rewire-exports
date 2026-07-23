"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.restore = restore;
exports.rewire = rewire;
var _default = exports.default = function _default() {
  return null;
};
var _default2 = _default;
function rewire($stub) {
  exports.default = _default = $stub;
}
function restore() {
  exports.default = _default = _default2;
}