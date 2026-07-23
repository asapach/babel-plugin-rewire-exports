"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.restore = restore;
exports.rewire = rewire;
var foo;
var _default = foo;
function rewire($stub) {
  exports.default = foo = $stub;
}
function restore() {
  exports.default = foo = _default;
}