var render = function render() {
  return /*#__PURE__*/React.createElement("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 10
    }
  });
};

var _default = function () {
  return /*#__PURE__*/React.createElement("span", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 2,
      columnNumber: 10
    }
  });
};

var _jsxFileName = "input.jsx";
export { _default as default };
export { render };

const test = () => /*#__PURE__*/React.createElement("span", {
  __self: this,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9,
    columnNumber: 27
  }
});

var _test = test;
export { _test as test };
var _default2 = _default,
    _render = render;
export function rewire($stub) {
  _default = $stub;
}
export function rewire$render($stub) {
  render = $stub;
}
export function rewire$test($stub) {
  _test = $stub;
}
export function restore() {
  _default = _default2;
  render = _render;
  _test = test;
}
