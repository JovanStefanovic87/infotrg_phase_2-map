'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var fi_1 = require("react-icons/fi"); // Import icons
var CategoryList = function (_a) {
    var categories = _a.categories, translations = _a.translations, icons = _a.icons, languages = _a.languages, // Destructure languages
    languageId = _a.languageId;
    var _b = react_1.useState(new Set()), openCategories = _b[0], setOpenCategories = _b[1];
    var toggleCategory = function (id) {
        setOpenCategories(function (prev) {
            var newOpenCategories = new Set(prev);
            if (newOpenCategories.has(id)) {
                newOpenCategories["delete"](id);
            }
            else {
                newOpenCategories.add(id);
            }
            return newOpenCategories;
        });
    };
    var getCategoryName = function (labelId, languageId) {
        var translation = translations.find(function (t) { return t.labelId === labelId && t.languageId === languageId; });
        return translation ? translation.translation : 'Unknown';
    };
    var getLanguageName = function (languageId) {
        var language = languages.find(function (l) { return l.id === languageId; });
        return language ? language.name : 'Unknown';
    };
    var getParentCategoryName = function (parentId, languageId) {
        if (parentId === null)
            return 'Ovo je glavna nadkategorija';
        var findCategory = function (categories, parentId) {
            for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                var category = categories_1[_i];
                if (category.id === parentId) {
                    return category;
                }
                var foundInSubcategories = findCategory(category.subcategories || [], parentId);
                if (foundInSubcategories) {
                    return foundInSubcategories;
                }
            }
            return undefined;
        };
        var parentCategory = findCategory(categories, parentId);
        return parentCategory ? getCategoryName(parentCategory.labelId, languageId) : 'Unknown';
    };
    var getCategoryIconUrl = function (iconId) {
        var icon = icons.find(function (icon) { return icon.id === iconId; });
        return icon ? icon.url : '';
    };
    var getCategoryTranslations = function (labelId) {
        return translations.filter(function (t) { return t.labelId === labelId; });
    };
    var CategoryItem = function (_a) {
        var category = _a.category;
        var iconUrl = getCategoryIconUrl(category.iconId);
        var isOpen = openCategories.has(category.id);
        var categoryTranslations = getCategoryTranslations(category.labelId);
        var languagesList = categoryTranslations.map(function (t) { return getLanguageName(t.languageId); }).join(', ');
        return (react_1["default"].createElement("div", { key: category.id, className: 'border p-4 mb-4 rounded-lg shadow-md' },
            react_1["default"].createElement("div", { className: 'flex items-center justify-between' },
                react_1["default"].createElement("h3", { className: 'text-lg font-semibold' }, getCategoryName(category.labelId, languageId)),
                category.subcategories && category.subcategories.length > 0 && (react_1["default"].createElement("button", { className: 'text-blue-500 hover:text-blue-700 focus:outline-none flex items-center', onClick: function () { return toggleCategory(category.id); } },
                    isOpen ? react_1["default"].createElement(fi_1.FiChevronUp, { size: 24 }) : react_1["default"].createElement(fi_1.FiChevronDown, { size: 24 }),
                    react_1["default"].createElement("span", { className: 'ml-2' }, "Potkategorije")))),
            react_1["default"].createElement("p", { className: 'mt-2 text-gray-400' },
                react_1["default"].createElement("strong", null, "Nadkategorija:"),
                " ",
                getParentCategoryName(category.parentId, languageId)),
            react_1["default"].createElement("div", { className: 'mt-2' }, category.iconId ? (iconUrl ? (react_1["default"].createElement(image_1["default"], { src: iconUrl, alt: 'Category Icon', width: 50, height: 50 })) : (react_1["default"].createElement("p", null, "Icon not available"))) : (react_1["default"].createElement("p", null, "No icon"))),
            react_1["default"].createElement("div", { className: 'mt-2' },
                react_1["default"].createElement("strong", null, "Languages:"),
                " ",
                languagesList)));
    };
    var renderCategories = function (categories, parentId) {
        var subcategories = categories.filter(function (c) { return c.parentId === parentId; });
        if (subcategories.length === 0)
            return null;
        return (react_1["default"].createElement("div", { className: 'ml-4' }, subcategories.map(function (category) { return (react_1["default"].createElement("div", { key: category.id },
            react_1["default"].createElement(CategoryItem, { category: category }),
            openCategories.has(category.id) &&
                renderCategories(category.subcategories || [], category.id))); })));
    };
    return react_1["default"].createElement("div", { className: 'space-y-4' }, renderCategories(categories, null));
};
exports["default"] = CategoryList;
