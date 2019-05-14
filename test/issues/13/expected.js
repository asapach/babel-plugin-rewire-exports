var spam = _spam,
    _eggs2 = _eggs;

function _spam() {
  return {
    eggs: function eggs() {
      _eggs2();
    }
  };
}

export { spam };

function _eggs() {}

export { _eggs2 as eggs };
export function rewire$spam($stub) {
  spam = $stub;
}
export function rewire$eggs($stub) {
  _eggs2 = $stub;
}
export function restore() {
  spam = _spam;
  _eggs2 = _eggs;
}
