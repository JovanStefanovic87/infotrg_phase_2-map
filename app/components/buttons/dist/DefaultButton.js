"use strict";
// components/DefaultButton.tsx
exports.__esModule = true;
var react_1 = require("react");
var DefaultButton = function (_a) {
    var children = _a.children, onClick = _a.onClick, _b = _a.type, type = _b === void 0 ? 'button' : _b;
    return (react_1["default"].createElement("button", { type: type, className: 'bg-gradient-to-b from-sky-400 to-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:from-sky-500 hover:to-sky-700 hover:shadow-2xl active:bg-gradient-to-b active:from-sky-800 active:via-sky-700 active:to-sky-600 active:shadow-inner active:shadow-sky-900 focus:outline-none', onClick: onClick }, children));
};
exports["default"] = DefaultButton;
