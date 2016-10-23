export default function foo() {
  return bar();
}

export function bar() {
  return baz;
}

var baz = true;

export {bar as qux, baz};

export class whatsit extends foo {

}