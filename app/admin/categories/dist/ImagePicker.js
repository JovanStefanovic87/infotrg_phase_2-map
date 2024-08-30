'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var CustomModal_1 = require("@/app/components/modals/CustomModal"); // Adjust the import path as needed
var ImagePicker = function (_a) {
    var icons = _a.icons, isOpen = _a.isOpen, onSelect = _a.onSelect, onClose = _a.onClose;
    var _b = react_1.useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    // Filter icons based on the search term
    var filteredIcons = icons.filter(function (icon) {
        return icon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (react_1["default"].createElement(CustomModal_1["default"], { isOpen: isOpen, onRequestClose: onClose },
        react_1["default"].createElement("div", { className: 'mt-2 h-1/2 w-screen' },
            react_1["default"].createElement("input", { type: 'text', placeholder: 'Search icons...', value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: 'border p-2 rounded mb-4 w-full text-black' }),
            react_1["default"].createElement("div", { className: 'mt-2' }, filteredIcons.map(function (icon) { return (react_1["default"].createElement("div", { key: icon.id, className: 'inline-block p-2' },
                react_1["default"].createElement(image_1["default"], { src: icon.url, alt: icon.name || 'Icon', width: 50, height: 50, onClick: function () {
                        onSelect({ iconId: icon.id, iconUrl: icon.url });
                        onClose();
                    } }))); })))));
};
exports["default"] = ImagePicker;
