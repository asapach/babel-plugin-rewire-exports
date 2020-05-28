"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$baz = rewire$baz;
exports.rewire$rest = rewire$rest;
exports.rewire$foo = rewire$foo;
exports.rewire$ham = rewire$ham;
exports.rewire$eggs = rewire$eggs;
exports.rewire$aa = rewire$aa;
exports.rewire$bb = rewire$bb;
exports.rewire$quuz = rewire$quuz;
exports.rewire$other = rewire$other;
exports.rewire$quux = rewire$quux;
exports.rewire$corge = rewire$corge;
exports.rewire$grault = rewire$grault;
exports.restore = restore;
exports.bb = exports.aa = exports.grault = exports.corge = exports.quux = exports.other = exports.quuz = exports.eggs = exports.ham = exports.foo = exports.rest = exports.baz = void 0;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _qux = qux,
    _qux$foo = _qux.foo,
    foo = _qux$foo === void 0 ? false : _qux$foo,
    baz = _qux.bar,
    rest = _objectWithoutProperties(_qux, ["foo", "bar"]);

exports.rest = rest;
exports.baz = baz;
exports.foo = foo;

var _bacon = bacon,
    _bacon2 = _toArray(_bacon),
    _bacon2$ = _bacon2[0],
    ham = _bacon2$ === void 0 ? 1 : _bacon2$,
    eggs = _bacon2.slice(1);

exports.eggs = eggs;
exports.ham = ham;

var _fred = fred,
    _fred$quux = _fred.quux,
    quux = _fred$quux === void 0 ? false : _fred$quux,
    quuz = _fred.quuy,
    other = _objectWithoutProperties(_fred, ["quux", "quuy"]);

exports.other = other;
exports.quuz = quuz;
exports.quux = quux;

var _garply = garply,
    _garply2 = _toArray(_garply),
    _garply2$ = _garply2[0],
    corge = _garply2$ === void 0 ? 1 : _garply2$,
    grault = _garply2.slice(1);

exports.grault = grault;
exports.corge = corge;
var _a = {
  a: 3
},
    _a$a = _a.a,
    aa = _a$a === void 0 ? 10 : _a$a,
    _a$b$bb = _a.b.bb,
    bb = _a$b$bb === void 0 ? 5 : _a$b$bb;
exports.bb = bb;
exports.aa = aa;
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
