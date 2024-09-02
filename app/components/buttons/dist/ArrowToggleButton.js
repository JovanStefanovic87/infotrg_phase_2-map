"use strict";
exports.__esModule = true;
// components/ToggleButton.tsx
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
var ArrowToggleButton = function (_a) {
    var _b = _a.title, title = _b === void 0 ? '' : _b, isOpen = _a.isOpen, onClick = _a.onClick;
    return (react_1["default"].createElement("button", { className: 'text-blueLighter hover:text-blueLightest focus:outline-none flex items-center', onClick: onClick },
        react_1["default"].createElement("span", { className: 'ml-2' }, title),
        isOpen ? react_1["default"].createElement(fi_1.FiChevronUp, { size: 24 }) : react_1["default"].createElement(fi_1.FiChevronDown, { size: 24 })));
};
exports["default"] = ArrowToggleButton;
