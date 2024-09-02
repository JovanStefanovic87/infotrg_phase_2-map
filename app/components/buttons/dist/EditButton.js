"use strict";
// components/EditButton.tsx
exports.__esModule = true;
var react_1 = require("react");
var EditButton = function (_a) {
    var onClick = _a.onClick, _b = _a.value, value = _b === void 0 ? 'Izmeni' : _b;
    return (react_1["default"].createElement("button", { className: 'bg-sky-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-sky-600 focus:outline-none', onClick: onClick }, value));
};
exports["default"] = EditButton;
