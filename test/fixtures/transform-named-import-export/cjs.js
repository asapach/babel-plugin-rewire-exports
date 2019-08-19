"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$foo = rewire$foo;
exports.rewire = rewire;
exports.restore = restore;
exports["default"] = exports.foo = void 0;

var _bar = require("./bar.js");

_bar.foo.baz = 'qux';
var _foo = _bar.foo;
exports.foo = _foo;
var _default = _bar.foo;
exports["default"] = _default;
var _default2 = _default;

function rewire$foo($stub) {
  exports.foo = _foo = $stub;
}

function rewire($stub) {
  exports["default"] = _default = $stub;
}

function restore() {
  exports.foo = _foo = _bar.foo;
  exports["default"] = _default = _default2;
}