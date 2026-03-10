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
  foo = _qux$foo === void 0 ? false : _qux$foo,
  baz = _qux.bar,
  rest = _objectWithoutProperties(_qux, ["foo", "bar"]);
export { baz, rest, foo };
var _bacon = bacon,
  _bacon2 = _toArray(_bacon),
  _bacon2$ = _bacon2[0],
  ham = _bacon2$ === void 0 ? 1 : _bacon2$,
  eggs = _arrayLikeToArray(_bacon2).slice(1);
export { ham, eggs };
var _fred = fred,
  _fred$quux = _fred.quux,
  quux = _fred$quux === void 0 ? false : _fred$quux,
  quuz = _fred.quuy,
  other = _objectWithoutProperties(_fred, ["quux", "quuy"]);
export { quuz, other, quux };
var _garply = garply,
  _garply2 = _toArray(_garply),
  _garply2$ = _garply2[0],
  corge = _garply2$ === void 0 ? 1 : _garply2$,
  grault = _arrayLikeToArray(_garply2).slice(1);
export { corge, grault };
var _a = {
    a: 3
  },
  _a$a = _a.a,
  aa = _a$a === void 0 ? 10 : _a$a,
  _a$b$bb = _a.b.bb,
  bb = _a$b$bb === void 0 ? 5 : _a$b$bb;
export { aa, bb };
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
export function rewire$baz($stub) {
  baz = $stub;
}
export function rewire$rest($stub) {
  rest = $stub;
}
export function rewire$foo($stub) {
  foo = $stub;
}
export function rewire$ham($stub) {
  ham = $stub;
}
export function rewire$eggs($stub) {
  eggs = $stub;
}
export function rewire$aa($stub) {
  aa = $stub;
}
export function rewire$bb($stub) {
  bb = $stub;
}
export function rewire$quuz($stub) {
  quuz = $stub;
}
export function rewire$other($stub) {
  other = $stub;
}
export function rewire$quux($stub) {
  quux = $stub;
}
export function rewire$corge($stub) {
  corge = $stub;
}
export function rewire$grault($stub) {
  grault = $stub;
}
export function restore() {
  baz = _baz;
  rest = _rest;
  foo = _foo;
  ham = _ham;
  eggs = _eggs;
  aa = _aa;
  bb = _bb;
  quuz = _quuz;
  other = _other;
  quux = _quux;
  corge = _corge;
  grault = _grault;
}