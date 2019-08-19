var foo = function foo() {
  return bar();
},
    bar =
/*#__PURE__*/
regeneratorRuntime.mark(function bar() {
  return regeneratorRuntime.wrap(function bar$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return baz;

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, bar);
});

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

export { foo as default };
export { bar };
var baz = true;
export { bar as qux, baz };

var whatsit =
/*#__PURE__*/
function (_foo) {
  _inherits(whatsit, _foo);

  function whatsit() {
    _classCallCheck(this, whatsit);

    return _possibleConstructorReturn(this, _getPrototypeOf(whatsit).apply(this, arguments));
  }

  return whatsit;
}(foo);

export { whatsit };
var whatnot = false,
    whatever = true;
export { whatnot, whatever };
var _default = foo,
    _bar = bar,
    _qux = bar,
    _baz = baz,
    _whatsit = whatsit,
    _whatnot = whatnot,
    _whatever = whatever;
export function rewire($stub) {
  foo = $stub;
}
export function rewire$bar($stub) {
  bar = $stub;
}
export function rewire$qux($stub) {
  bar = $stub;
}
export function rewire$baz($stub) {
  baz = $stub;
}
export function rewire$whatsit($stub) {
  whatsit = $stub;
}
export function rewire$whatnot($stub) {
  whatnot = $stub;
}
export function rewire$whatever($stub) {
  whatever = $stub;
}
export function restore() {
  foo = _default;
  bar = _bar;
  bar = _qux;
  baz = _baz;
  whatsit = _whatsit;
  whatnot = _whatnot;
  whatever = _whatever;
}