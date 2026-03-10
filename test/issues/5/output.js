"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restore = restore;
exports.rewire$say = rewire$say;
exports.say = void 0;
var _module = require("./module1");
var _say = exports.say = _module.say;
function rewire$say($stub) {
  exports.say = _say = $stub;
}
function restore() {
  exports.say = _say = _module.say;
}