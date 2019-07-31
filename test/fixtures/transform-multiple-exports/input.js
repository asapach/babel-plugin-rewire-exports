export default function foo() {
  return bar();
}

export function* bar() {
  yield baz;
}

var baz = true;

export { bar as qux, baz };

export class whatsit extends foo {

}

export const whatnot = false, whatever = true;
