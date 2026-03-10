"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rest = exports.quuz = exports.quux = exports.other = exports.ham = exports.grault = exports.foo = exports.eggs = exports.corge = exports.bb = exports.baz = exports.aa = void 0;
exports.restore = restore;
exports.rewire$aa = rewire$aa;
exports.rewire$baz = rewire$baz;
exports.rewire$bb = rewire$bb;
exports.rewire$corge = rewire$corge;
exports.rewire$eggs = rewire$eggs;
exports.rewire$foo = rewire$foo;
exports.rewire$grault = rewire$grault;
exports.rewire$ham = rewire$ham;
exports.rewire$other = rewire$other;
exports.rewire$quux = rewire$quux;
exports.rewire$quuz = rewire$quuz;
exports.rewire$rest = rewire$rest;
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _qux = qux,
  _qux$foo = _qux.foo,
  foo = exports.foo = _qux$foo === void 0 ? false : _qux$foo,
  baz = exports.baz = _qux.bar,
  rest = exports.rest = _objectWithoutProperties(_qux, ["foo", "bar"]);
var _bacon = bacon,
  _bacon2 = _toArray(_bacon),
  _bacon2$ = _bacon2[0],
  ham = exports.ham = _bacon2$ === void 0 ? 1 : _bacon2$,
  eggs = exports.eggs = _arrayLikeToArray(_bacon2).slice(1);
var _fred = fred,
  _fred$quux = _fred.quux,
  quux = exports.quux = _fred$quux === void 0 ? false : _fred$quux,
  quuz = exports.quuz = _fred.quuy,
  other = exports.other = _objectWithoutProperties(_fred, ["quux", "quuy"]);
var _garply = garply,
  _garply2 = _toArray(_garply),
  _garply2$ = _garply2[0],
  corge = exports.corge = _garply2$ === void 0 ? 1 : _garply2$,
  grault = exports.grault = _arrayLikeToArray(_garply2).slice(1);
var _a = {
    a: 3
  },
  _a$a = _a.a,
  aa = exports.aa = _a$a === void 0 ? 10 : _a$a,
  _a$b$bb = _a.b.bb,
  bb = exports.bb = _a$b$bb === void 0 ? 5 : _a$b$bb;
var _baz = baz,
  _rest = rest,
  _foo = foo,
  _ham = ham,
  _eggs = eggs,
  _aa = aa,
  _bb = bb,
  _quuz = quuz,
  _other = other,
  _quux = quux,
  _corge = corge,
  _grault = grault;
function rewire$baz($stub) {
  exports.baz = baz = $stub;
}
function rewire$rest($stub) {
  exports.rest = rest = $stub;
}
function rewire$foo($stub) {
  exports.foo = foo = $stub;
}
function rewire$ham($stub) {
  exports.ham = ham = $stub;
}
function rewire$eggs($stub) {
  exports.eggs = eggs = $stub;
}
function rewire$aa($stub) {
  exports.aa = aa = $stub;
}
function rewire$bb($stub) {
  exports.bb = bb = $stub;
}
function rewire$quuz($stub) {
  exports.quuz = quuz = $stub;
}
function rewire$other($stub) {
  exports.other = other = $stub;
}
function rewire$quux($stub) {
  exports.quux = quux = $stub;
}
function rewire$corge($stub) {
  exports.corge = corge = $stub;
}
function rewire$grault($stub) {
  exports.grault = grault = $stub;
}
function restore() {
  exports.baz = baz = _baz;
  exports.rest = rest = _rest;
  exports.foo = foo = _foo;
  exports.ham = ham = _ham;
  exports.eggs = eggs = _eggs;
  exports.aa = aa = _aa;
  exports.bb = bb = _bb;
  exports.quuz = quuz = _quuz;
  exports.other = other = _other;
  exports.quux = quux = _quux;
  exports.corge = corge = _corge;
  exports.grault = grault = _grault;
}