export var { foo, bar = false, baz } = qux;
export var [ham = 1, ...eggs] = bacon;
var _foo = foo,
    _bar = bar,
    _baz = baz,
    _ham = ham,
    _eggs = eggs;
export function rewire$foo($stub) {
  foo = $stub;
}
export function rewire$bar($stub) {
  bar = $stub;
}
export function rewire$baz($stub) {
  baz = $stub;
}
export function rewire$ham($stub) {
  ham = $stub;
}
export function rewire$eggs($stub) {
  eggs = $stub;
}
export function restore() {
  foo = _foo;
  bar = _bar;
  baz = _baz;
  ham = _ham;
  eggs = _eggs;
}