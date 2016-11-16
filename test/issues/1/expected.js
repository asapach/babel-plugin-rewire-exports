"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire = rewire;
exports.rewire$baz = rewire$baz;
exports.restore = restore;
var foo = _foo,
    baz = _baz;
function _foo() {
  return null;
}

exports.default = foo;
function _baz() {
  return false;
}
exports.baz = baz;

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