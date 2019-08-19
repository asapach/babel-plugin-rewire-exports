"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$whatsit = rewire$whatsit;
exports.rewire$foo = rewire$foo;
exports.rewire$baz = rewire$baz;
exports.restore = restore;
exports.whatsit = exports.baz = exports.foo = void 0;
var foo = 'bar',
    baz = 'qux';
exports.baz = baz;
exports.foo = foo;
var whatsit = false;
exports.whatsit = whatsit;
var _whatsit = whatsit,
    _foo = foo,
    _baz = baz;

function rewire$whatsit($stub) {
  exports.whatsit = whatsit = $stub;
}

function rewire$foo($stub) {
  exports.foo = foo = $stub;
}

function rewire$baz($stub) {
  exports.baz = baz = $stub;
}

function restore() {
  exports.whatsit = whatsit = _whatsit;
  exports.foo = foo = _foo;
  exports.baz = baz = _baz;
}