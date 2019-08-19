"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire = rewire;
exports.restore = restore;
exports["default"] = void 0;
var foo;
exports["default"] = foo;
var _default = foo;

function rewire($stub) {
  exports["default"] = foo = $stub;
}

function restore() {
  exports["default"] = foo = _default;
}