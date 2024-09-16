'use client';
"use strict";
exports.__esModule = true;
exports.getCategoryIconUrl = exports.isTextHyperlinked = exports.handleMouseLeave = exports.useIsMobile = void 0;
var react_1 = require("react");
exports.useIsMobile = function () {
    var _a = react_1.useState(false), isMobile = _a[0], setIsMobile = _a[1];
    react_1.useEffect(function () {
        var checkIsMobile = function () {
            var mobileCheck = window.matchMedia('(max-width: 768px)');
            setIsMobile(mobileCheck.matches);
        };
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return function () { return window.removeEventListener('resize', checkIsMobile); };
    }, []);
    return isMobile;
};
exports.handleMouseLeave = function (_a) {
    var event = _a.event, hasChildren = _a.hasChildren, dropdownRef = _a.dropdownRef, setIsOpen = _a.setIsOpen, onMouseLeave = _a.onMouseLeave;
    var relatedTarget = event.relatedTarget;
    if (hasChildren &&
        dropdownRef.current &&
        relatedTarget instanceof Node &&
        !dropdownRef.current.contains(relatedTarget)) {
        setIsOpen(false);
        if (onMouseLeave) {
            onMouseLeave();
        }
    }
};
exports.isTextHyperlinked = function (text, hyperlinks) {
    var foundLink = hyperlinks.find(function (link) { return link.text === text; });
    return foundLink ? foundLink.url : undefined;
};
exports.getCategoryIconUrl = function (iconId, icons) {
    var icon = icons.find(function (icon) { return icon.id === iconId; });
    return icon ? icon.url : '';
};
