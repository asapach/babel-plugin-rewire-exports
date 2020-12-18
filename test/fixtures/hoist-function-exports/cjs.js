"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire = rewire;
exports.rewire$baz = rewire$baz;
exports.restore = restore;
exports.baz = exports["default"] = void 0;

var baz = function baz() {
  return false;
};

exports.baz = baz;

var foo = function foo() {
  return null;
};

exports["default"] = foo;
foo.bar = baz;
var _default = foo,
    _baz = baz;

function rewire($stub) {
  exports["default"] = foo = $stub;
}

function rewire$baz($stub) {
  exports.baz = baz = $stub;
}

function restore() {
  exports["default"] = foo = _default;
  exports.baz = baz = _baz;
}
