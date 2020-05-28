export var {
  foo = false,
  bar: baz,
  ...rest
} = qux;
export var [ham = 1, ...eggs] = bacon;
const {
  quux = false,
  quuy: quuz,
  ...other
} = fred;
var _quuz = quuz;
var _other = other;
var _quux = quux;
export { _quuz as quuz, _other as other, _quux as quux };
const [corge = 1, ...grault] = garply;
var _corge = corge;
var _grault = grault;
export { _corge as corge, _grault as grault };
export var {
  a: aa = 10,
  b: {
    bb = 5
  }
} = {
  a: 3
};
var _baz = baz,
    _rest = rest,
    _foo = foo,
    _ham = ham,
    _eggs = eggs,
    _aa = aa,
    _bb = bb;
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
  _quuz = $stub;
}
export function rewire$other($stub) {
  _other = $stub;
}
export function rewire$quux($stub) {
  _quux = $stub;
}
export function rewire$corge($stub) {
  _corge = $stub;
}
export function rewire$grault($stub) {
  _grault = $stub;
}
export function restore() {
  baz = _baz;
  rest = _rest;
  foo = _foo;
  ham = _ham;
  eggs = _eggs;
  aa = _aa;
  bb = _bb;
  _quuz = quuz;
  _other = other;
  _quux = quux;
  _corge = corge;
  _grault = grault;
}
