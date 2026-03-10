"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = void 0;
exports.restore = restore;
exports.rewire$bar = rewire$bar;
var foo;
var _bar = foo;
function rewire$bar($stub) {
  exports.bar = foo = $stub;
}
function restore() {
  exports.bar = foo = _bar;
}