"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$say = rewire$say;
exports.restore = restore;
exports.say = void 0;

var _module = require("./module1");

var _say = _module.say;
exports.say = _say;
var _say2 = _say;

function rewire$say($stub) {
  exports.say = _say = $stub;
}

function restore() {
  exports.say = _say = _say2;
}