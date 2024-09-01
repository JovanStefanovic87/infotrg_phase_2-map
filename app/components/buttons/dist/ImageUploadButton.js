// components/ImageUploadButton.tsx
'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
var ImageUploadButton = function (_a) {
    var id = _a.id, label = _a.label, onChange = _a.onChange, _b = _a.accept, accept = _b === void 0 ? 'image/*' : _b, _c = _a.icon, icon = _c === void 0 ? react_1["default"].createElement(fi_1.FiUpload, { className: 'text-sky-500', size: 24 }) : _c;
    return (react_1["default"].createElement("div", { className: 'mb-4' },
        react_1["default"].createElement("input", { type: 'file', id: id, className: 'hidden', name: id, accept: accept, onChange: onChange }),
        react_1["default"].createElement("label", { htmlFor: id, className: 'flex items-center justify-center gap-2 text-black border border-sky-500 p-4 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-sky-100 hover:border-sky-700 transition duration-200' },
            icon,
            react_1["default"].createElement("span", { className: 'font-semibold' }, label))));
};
exports["default"] = ImageUploadButton;
