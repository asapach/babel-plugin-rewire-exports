var spam = function spam() {
  return {
    eggs: function eggs() {
      _eggs();
    },
    foo: function foo() {
      console.log(_foo);
    }
  };
},
    _eggs = function _eggs() {};

export { spam };
export { _eggs as eggs };
var _foo = 1;
export { _foo as foo };
var _spam = spam,
    _eggs2 = _eggs,
    _foo2 = _foo;
export function rewire$spam($stub) {
  spam = $stub;
}
export function rewire$eggs($stub) {
  _eggs = $stub;
}
export function rewire$foo($stub) {
  _foo = $stub;
}
export function restore() {
  spam = _spam;
  _eggs = _eggs2;
  _foo = _foo2;
}
