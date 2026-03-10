"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restore = exports["default"] = void 0;
exports.restore$rewire = restore$rewire;
exports.rewire$default = rewire$default;
exports.rewire$restore = rewire$restore;
var restore = exports.restore = function restore() {};
var rewire = exports["default"] = function rewire() {
  return restore();
};
var _default = rewire,
  _restore = restore;
function rewire$default($stub) {
  exports["default"] = rewire = $stub;
}
function rewire$restore($stub) {
  exports.restore = restore = $stub;
}
function restore$rewire() {
  exports["default"] = rewire = _default;
  exports.restore = restore = _restore;
}