"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  foo: true
};
Object.defineProperty(exports, "foo", {
  enumerable: true,
  get: function get() {
    return _bar.foo;
  }
});

var _bar = require("./bar.js");

var _baz = require("./baz.js");

Object.keys(_baz).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _baz[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _baz[key];
    }
  });
});
