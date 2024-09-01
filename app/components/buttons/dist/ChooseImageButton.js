// components/ChooseImageButton.tsx
'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
var ChooseImageButton = function (_a) {
    var onClick = _a.onClick, _b = _a.label, label = _b === void 0 ? 'Choose an image from the library' : _b, // Default label if none is provided
    _c = _a.icon, // Default label if none is provided
    icon = _c === void 0 ? react_1["default"].createElement(fi_1.FiImage, { className: 'text-sky-500', size: 24 }) : _c;
    return (react_1["default"].createElement("div", { className: 'mb-4' },
        react_1["default"].createElement("button", { type: 'button', className: 'flex items-center justify-center gap-2 text-black border border-sky-500 p-4 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-sky-100 hover:border-sky-700 transition duration-200', onClick: onClick },
            icon,
            react_1["default"].createElement("span", { className: 'font-semibold' }, label))));
};
exports["default"] = ChooseImageButton;
