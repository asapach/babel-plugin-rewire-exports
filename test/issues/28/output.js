var render = function render() {
  return /*#__PURE__*/_jsxDEV("span", {}, void 0, false);
};
var _default = function () {
  return /*#__PURE__*/_jsxDEV("span", {}, void 0, false);
};
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export { _default as default };
export { render };
const test = () => /*#__PURE__*/_jsxDEV("span", {}, void 0, false);
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