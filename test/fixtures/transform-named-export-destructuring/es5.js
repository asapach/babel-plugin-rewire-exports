function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
    eggs = _bacon2.slice(1);

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
    grault = _garply2.slice(1);

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
