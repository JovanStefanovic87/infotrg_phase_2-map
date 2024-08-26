"use strict";
exports.__esModule = true;
// components/CustomModal.tsx
var react_1 = require("react");
var CustomModal = function (_a) {
    var isOpen = _a.isOpen, onRequestClose = _a.onRequestClose, children = _a.children;
    if (!isOpen)
        return null;
    var handleOverlayClick = function (event) {
        if (event.target === event.currentTarget) {
            onRequestClose();
        }
    };
    return (react_1["default"].createElement("div", { className: 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50', onClick: handleOverlayClick },
        react_1["default"].createElement("div", { className: 'bg-white p-6 rounded-lg shadow-lg' }, children)));
};
exports["default"] = CustomModal;
