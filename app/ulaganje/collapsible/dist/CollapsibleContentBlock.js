'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CollapsibleContentBlockConainer_1 = require("./CollapsibleContentBlockConainer");
var CollapsibleImageBlockItem_1 = require("./CollapsibleImageBlockItem");
var TextBlockItem_1 = require("./TextBlockItem");
var ArrowToggleButton_1 = require("@/app/components/buttons/ArrowToggleButton");
var CollapsibleContentBlock = function (_a) {
    var title = _a.title, openModal = _a.openModal, contentBlocks = _a.contentBlocks;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var toggleContent = function () {
        setIsOpen(!isOpen);
    };
    return (React.createElement(CollapsibleContentBlockConainer_1["default"], null,
        React.createElement(ArrowToggleButton_1["default"], { title: title, isOpen: isOpen, onClick: toggleContent }),
        React.createElement("div", { className: "overflow-hidden transition-all duration-500 ease-in-out " + (isOpen ? 'max-h-content' : 'max-h-0') },
            React.createElement("div", { className: 'py-4 px-6 bg-gray-100' }, contentBlocks.map(function (block, index) {
                if (block.type === 'text') {
                    return React.createElement(TextBlockItem_1["default"], { key: index, content: block.content });
                }
                if (block.type === 'image') {
                    return block.content.map(function (img, imgIndex) { return (React.createElement(CollapsibleImageBlockItem_1["default"], { key: imgIndex, img: img, title: title, imgIndex: imgIndex, openModal: openModal })); });
                }
            })))));
};
exports["default"] = CollapsibleContentBlock;
