"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = exports.baz = void 0;
exports.restore = restore;
exports.rewire$baz = rewire$baz;
exports.rewire$foo = rewire$foo;
exports.rewire$whatsit = rewire$whatsit;
exports.whatsit = void 0;
var foo = exports.foo = 'bar',
  baz = exports.baz = 'qux';
var whatsit = exports.whatsit = false;
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