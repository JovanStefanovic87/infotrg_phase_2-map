'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var Combobox = function (_a) {
    var options = _a.options, onSelect = _a.onSelect, _b = _a.placeholder, placeholder = _b === void 0 ? 'Select...' : _b;
    var _c = react_1.useState(false), isOpen = _c[0], setIsOpen = _c[1];
    var _d = react_1.useState(''), inputValue = _d[0], setInputValue = _d[1];
    var getCommonCharacterCount = function (str1, str2) {
        var charCount1 = Array.from(str1).reduce(function (acc, char) {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
        }, {});
        var charCount2 = Array.from(str2).reduce(function (acc, char) {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(charCount1).reduce(function (acc, char) {
            if (charCount2[char]) {
                acc += Math.min(charCount1[char], charCount2[char]);
            }
            return acc;
        }, 0);
    };
    var filterOptions = function (searchTerm) {
        var lowercasedSearch = searchTerm.trim().toLowerCase();
        var exactMatches = options.filter(function (translation) {
            return translation.translation.trim().toLowerCase().includes(lowercasedSearch);
        });
        if (exactMatches.length > 0) {
            return exactMatches.sort(function (a, b) { return a.translation.localeCompare(b.translation); });
        }
        var closeMatches = options
            .map(function (translation) { return (__assign(__assign({}, translation), { commonChars: getCommonCharacterCount(lowercasedSearch, translation.translation.trim().toLowerCase()) })); })
            .filter(function (translation) { return translation.commonChars > 0; })
            .sort(function (a, b) { return b.commonChars - a.commonChars; });
        return closeMatches;
    };
    var filteredOptions = filterOptions(inputValue);
    var handleInputChange = function (e) {
        setInputValue(e.target.value);
        setIsOpen(true);
    };
    var handleOptionClick = function (option) {
        setInputValue(option.translation);
        setIsOpen(false);
        onSelect(option);
    };
    var handleInputClick = function () {
        setIsOpen(true);
    };
    var handleClickOutside = function (e) {
        if (!e.target.closest('.combobox')) {
            setIsOpen(false);
        }
    };
    react_1["default"].useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (react_1["default"].createElement("div", { className: 'relative combobox' },
        react_1["default"].createElement("input", { type: 'text', value: inputValue, onClick: handleInputClick, onChange: handleInputChange, placeholder: placeholder, className: 'block w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500' }),
        isOpen && filteredOptions.length > 0 && (react_1["default"].createElement("div", { className: 'absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto' }, filteredOptions.map(function (option) { return (react_1["default"].createElement("div", { key: option.id, onClick: function () { return handleOptionClick(option); }, className: 'cursor-pointer p-2 hover:bg-gray-200 text-black' }, option.translation)); })))));
};
exports["default"] = Combobox;
