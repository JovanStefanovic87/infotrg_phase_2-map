"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var CategoryList = function (_a) {
    var categories = _a.categories, translations = _a.translations, icons = _a.icons, languageId = _a.languageId;
    var getCategoryName = function (labelId, languageId) {
        var translation = translations.find(function (t) { return t.labelId === labelId && t.languageId === languageId; });
        return translation ? translation.translation : 'Unknown';
    };
    var getParentCategoryName = function (parentId, languageId) {
        if (parentId === null)
            return 'None';
        var findCategory = function (categories, parentId) {
            for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                var category = categories_1[_i];
                if (category.id === parentId) {
                    return category;
                }
                var foundInSubcategories = findCategory(category.subcategories, parentId);
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
    var renderCategory = function (category) {
        var iconUrl = getCategoryIconUrl(category.iconId);
        return (react_1["default"].createElement("div", { key: category.id, className: 'border p-4 mb-4' },
            react_1["default"].createElement("h3", { className: 'text-lg font-semibold' }, getCategoryName(category.labelId, languageId)),
            react_1["default"].createElement("p", null,
                "Parent Category: ",
                getParentCategoryName(category.parentId, languageId)),
            react_1["default"].createElement("div", null, category.iconId ? (iconUrl ? (react_1["default"].createElement(image_1["default"], { src: iconUrl, alt: 'Category Icon', width: 50, height: 50 })) : (react_1["default"].createElement("p", null, "Icon not available"))) : (react_1["default"].createElement("p", null, "No icon")))));
    };
    console.log(categories);
    var renderCategories = function (categories, parentId) {
        var subcategories = categories.filter(function (c) { return c.parentId === parentId; });
        if (subcategories.length === 0)
            return null;
        return (react_1["default"].createElement("div", { className: 'ml-4' }, subcategories.map(function (category) { return (react_1["default"].createElement("div", { key: category.id },
            renderCategory(category),
            renderCategories(category.subcategories, category.id))); })));
    };
    return react_1["default"].createElement("div", null, renderCategories(categories, null));
};
exports["default"] = CategoryList;
