"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire = rewire;
exports.rewire$baz = rewire$baz;
exports.restore = restore;
exports.baz = exports.default = void 0;
var foo = _foo,
    baz = _baz;
exports.baz = baz;
exports.default = foo;

function _foo() {
  return null;
}

function _baz() {
  return false;
}

function rewire($stub) {
  exports.default = foo = $stub;
}

function rewire$baz($stub) {
  exports.baz = baz = $stub;
}

function restore() {
  exports.default = foo = _foo;
  exports.baz = baz = _baz;
}