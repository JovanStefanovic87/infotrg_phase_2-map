"use strict";
// components/DeleteButton.tsx
exports.__esModule = true;
var react_1 = require("react");
var DeleteButton = function (_a) {
    var onClick = _a.onClick, _b = _a.children, children = _b === void 0 ? 'Obriši' : _b;
    return (react_1["default"].createElement("button", { className: 'bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600 focus:outline-none', onClick: onClick }, children));
};
exports["default"] = DeleteButton;
