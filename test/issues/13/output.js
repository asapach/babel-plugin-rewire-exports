var spam = _spam,
    _eggs2 = _eggs;

function _spam() {
  return {
    eggs: function eggs() {
      _eggs2();
    },
    foo: function foo() {
      console.log(_foo);
    }
  };
}

export { spam };

function _eggs() {}

export { _eggs2 as eggs };
var _foo = 1;
export { _foo as foo };
var _foo2 = _foo;
export function rewire$spam($stub) {
  spam = $stub;
}
export function rewire$eggs($stub) {
  _eggs2 = $stub;
}
export function rewire$foo($stub) {
  _foo = $stub;
}
export function restore() {
  spam = _spam;
  _eggs2 = _eggs;
  _foo = _foo2;
}
