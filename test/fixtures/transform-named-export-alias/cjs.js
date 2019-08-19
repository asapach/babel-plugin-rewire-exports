"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$bar = rewire$bar;
exports.restore = restore;
exports.bar = void 0;
var foo;
exports.bar = foo;
var _bar = foo;

function rewire$bar($stub) {
  exports.bar = foo = $stub;
}

function restore() {
  exports.bar = foo = _bar;
}