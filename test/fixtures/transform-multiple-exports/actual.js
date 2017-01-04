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

export { whatnot, undefined as undef };