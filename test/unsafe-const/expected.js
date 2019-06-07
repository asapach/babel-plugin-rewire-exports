export let foo = function () {
  return bar + ham + eggs;
};
let bar = false;
export { bar };
export { foo as default };
export let [ham] = spam;
export let {
  eggs
} = sausage;
var _foo = foo,
    _bar = bar,
    _default = foo,
    _ham = ham,
    _eggs = eggs;
export function rewire$foo($stub) {
  foo = $stub;
}
export function rewire$bar($stub) {
  bar = $stub;
}
export function rewire($stub) {
  foo = $stub;
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
  foo = _default;
  ham = _ham;
  eggs = _eggs;
}
