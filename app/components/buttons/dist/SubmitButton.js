"use strict";
// components/SubmitButton.tsx
exports.__esModule = true;
var react_1 = require("react");
var DefaultButton_1 = require("./DefaultButton");
var SubmitButton = function (_a) {
    var children = _a.children;
    return react_1["default"].createElement(DefaultButton_1["default"], { type: 'submit' }, children);
};
exports["default"] = SubmitButton;
