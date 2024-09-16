"use strict";
exports.__esModule = true;
// components/CustomModal.tsx
var react_1 = require("react");
var CustomModal = function (_a) {
    var isOpen = _a.isOpen, onRequestClose = _a.onRequestClose, children = _a.children, _b = _a.mt, mt = _b === void 0 ? '0' : _b;
    // Handle closing the modal when pressing the Escape key
    react_1.useEffect(function () {
        var handleKeyDown = function (event) {
            if (event.key === 'Escape') {
                onRequestClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onRequestClose]);
    if (!isOpen)
        return null;
    var handleOverlayClick = function (event) {
        if (event.target === event.currentTarget) {
            onRequestClose();
        }
    };
    return (react_1["default"].createElement("div", { className: 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out', onClick: handleOverlayClick, "aria-labelledby": 'modal-title', "aria-modal": 'true', role: 'dialog' },
        react_1["default"].createElement("div", { className: "bg-white flex rounded-lg shadow-lg mt-" + mt + " max-w-6xl mx-4", style: { marginTop: mt } }, children)));
};
exports["default"] = CustomModal;
