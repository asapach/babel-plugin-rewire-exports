"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewire$foo = rewire$foo;
exports.rewire$bar = rewire$bar;
exports.rewire$ham = rewire$ham;
exports.rewire$eggs = rewire$eggs;
exports.rewire$quux = rewire$quux;
exports.rewire$quuz = rewire$quuz;
exports.rewire$corge = rewire$corge;
exports.rewire$grault = rewire$grault;
exports.restore = restore;
exports.grault = exports.corge = exports.quuz = exports.quux = exports.eggs = exports.ham = exports.foo = exports.bar = void 0;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _qux = qux,
    _qux$foo = _qux.foo,
    foo = _qux$foo === void 0 ? false : _qux$foo,
    bar = _objectWithoutProperties(_qux, ["foo"]);

exports.bar = bar;
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
    quuz = _objectWithoutProperties(_fred, ["quux"]);

exports.quuz = quuz;
exports.quux = quux;

var _garply = garply,
    _garply2 = _toArray(_garply),
    _garply2$ = _garply2[0],
    corge = _garply2$ === void 0 ? 1 : _garply2$,
    grault = _garply2.slice(1);

exports.grault = grault;
exports.corge = corge;
var _foo = foo,
    _bar = bar,
    _ham = ham,
    _eggs = eggs,
    _quux = quux,
    _quuz = quuz,
    _corge = corge,
    _grault = grault;

function rewire$foo($stub) {
  exports.foo = foo = $stub;
}

function rewire$bar($stub) {
  exports.bar = bar = $stub;
}

function rewire$ham($stub) {
  exports.ham = ham = $stub;
}

function rewire$eggs($stub) {
  exports.eggs = eggs = $stub;
}

function rewire$quux($stub) {
  exports.quux = quux = $stub;
}

function rewire$quuz($stub) {
  exports.quuz = quuz = $stub;
}

function rewire$corge($stub) {
  exports.corge = corge = $stub;
}

function rewire$grault($stub) {
  exports.grault = grault = $stub;
}

function restore() {
  exports.foo = foo = _foo;
  exports.bar = bar = _bar;
  exports.ham = ham = _ham;
  exports.eggs = eggs = _eggs;
  exports.quux = quux = _quux;
  exports.quuz = quuz = _quuz;
  exports.corge = corge = _corge;
  exports.grault = grault = _grault;
}