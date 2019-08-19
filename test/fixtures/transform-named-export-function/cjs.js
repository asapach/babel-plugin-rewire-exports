"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$foo = rewire$foo;
exports.restore = restore;
exports.foo = void 0;

var foo = function foo() {
  return null;
};

exports.foo = foo;
var _foo = foo;

function rewire$foo($stub) {
  exports.foo = foo = $stub;
}

function restore() {
  exports.foo = foo = _foo;
}