"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = exports.default = void 0;
exports.restore = restore;
exports.rewire = rewire;
exports.rewire$foo = rewire$foo;
var _bar = _interopRequireDefault(require("./bar.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_bar.default.baz = 'qux';
var _foo = exports.foo = _bar.default;
var _default = exports.default = _bar.default;
var _default2 = _default;
function rewire$foo($stub) {
  exports.foo = _foo = $stub;
}
function rewire($stub) {
  exports.default = _default = $stub;
}
function restore() {
  exports.foo = _foo = _bar.default;
  exports.default = _default = _default2;
}