"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$default = rewire$default;
exports.rewire$restore = rewire$restore;
exports.restore$rewire = restore$rewire;
exports.restore = exports["default"] = void 0;

var restore = function restore() {};

exports.restore = restore;

var rewire = function rewire() {
  return restore();
};

exports["default"] = rewire;
var _default = rewire,
    _restore = restore;

function rewire$default($stub) {
  exports["default"] = rewire = $stub;
}

function rewire$restore($stub) {
  exports.restore = restore = $stub;
}

function restore$rewire() {
  exports["default"] = rewire = _default;
  exports.restore = restore = _restore;
}
