export var {
  foo = false,
  ...bar
} = qux;
export var [ham = 1, ...eggs] = bacon;
const {
  quux = false,
  ...quuz
} = fred;
var _quux = quux;
var _quuz = quuz;
export { _quux as quux, _quuz as quuz };
const [corge = 1, ...grault] = garply;
var _corge = corge;
var _grault = grault;
export { _corge as corge, _grault as grault };
var _foo = foo,
    _bar = bar,
    _ham = ham,
    _eggs = eggs;
export function rewire$foo($stub) {
  foo = $stub;
}
export function rewire$bar($stub) {
  bar = $stub;
}
export function rewire$ham($stub) {
  ham = $stub;
}
export function rewire$eggs($stub) {
  eggs = $stub;
}
export function rewire$quux($stub) {
  _quux = $stub;
}
export function rewire$quuz($stub) {
  _quuz = $stub;
}
export function rewire$corge($stub) {
  _corge = $stub;
}
export function rewire$grault($stub) {
  _grault = $stub;
}
export function restore() {
  foo = _foo;
  bar = _bar;
  ham = _ham;
  eggs = _eggs;
  _quux = quux;
  _quuz = quuz;
  _corge = corge;
  _grault = grault;
}
