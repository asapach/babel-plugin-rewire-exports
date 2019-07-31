var foo = class foo {
  constructor() {
    this.foo = 'bar';
  }

};
export { foo as default };
var _default = foo;
export function rewire($stub) {
  foo = $stub;
}
export function restore() {
  foo = _default;
}