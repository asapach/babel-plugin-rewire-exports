"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.baz = void 0;
exports.restore = restore;
exports.rewire = rewire;
exports.rewire$baz = rewire$baz;
var baz = exports.baz = function baz() {
  return false;
};
var foo = exports.default = function foo() {
  return null;
};
var _default = foo,
  _baz = baz;
function rewire($stub) {
  exports.default = foo = $stub;
}
function rewire$baz($stub) {
  exports.baz = baz = $stub;
}
function restore() {
  exports.default = foo = _default;
  exports.baz = baz = _baz;
}