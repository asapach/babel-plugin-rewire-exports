"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;
exports.restore = restore;
exports.rewire$foo = rewire$foo;
var foo;
var _foo = foo;
function rewire$foo($stub) {
  exports.foo = foo = $stub;
}
function restore() {
  exports.foo = foo = _foo;
}