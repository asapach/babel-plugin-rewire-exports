"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$foo = rewire$foo;
exports.rewire = rewire;
exports.restore = restore;
exports["default"] = exports.foo = void 0;

var _bar = _interopRequireDefault(require("./bar.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_bar["default"].baz = 'qux';
var _foo = _bar["default"];
exports.foo = _foo;
var _default = _bar["default"];
exports["default"] = _default;
var _default2 = _default;

function rewire$foo($stub) {
  exports.foo = _foo = $stub;
}

function rewire($stub) {
  exports["default"] = _default = $stub;
}

function restore() {
  exports.foo = _foo = _bar["default"];
  exports["default"] = _default = _default2;
}