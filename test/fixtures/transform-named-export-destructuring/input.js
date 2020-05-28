export var { foo = false, bar: baz, ...rest } = qux;
export var [ham = 1, ...eggs] = bacon;

export const { quux = false, quuy: quuz, ...other } = fred;
export const [corge = 1, ...grault] = garply;

export var { a: aa = 10, b: { bb = 5 } } = { a: 3 };
