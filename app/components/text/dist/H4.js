"use strict";
exports.__esModule = true;
var react_1 = require("react");
var H4 = function (_a) {
    var text = _a.text, _b = _a.align, align = _b === void 0 ? 'left' : _b, _c = _a.padding, padding = _c === void 0 ? 0 : _c, _d = _a.paddingBottom, paddingBottom = _d === void 0 ? 0 : _d, _e = _a.paddingTop, paddingTop = _e === void 0 ? 0 : _e, _f = _a.weight, weight = _f === void 0 ? 'semibold' : _f, _g = _a.color, color = _g === void 0 ? 'black' : _g, _h = _a.wrap, wrap = _h === void 0 ? false : _h, _j = _a.shouldBreak, shouldBreak = _j === void 0 ? false : _j;
    var maxWidth = "calc(100% - " + 2 * padding + "px)";
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h4", { className: "text-base text-" + color + " text-wrap font-" + weight + " text-" + align + " overflow-hidden " + (wrap ? '' : 'whitespace-nowrap') + " " + (shouldBreak ? 'whitespace-pre-line break-words w-screen' : 'whitespace-nowrap'), style: { maxWidth: maxWidth, paddingBottom: paddingBottom, paddingTop: paddingTop } }, text)));
};
exports["default"] = H4;
