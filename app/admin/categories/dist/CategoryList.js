"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var CategoryList = function (_a) {
    var categories = _a.categories, translations = _a.translations, icons = _a.icons;
    react_1.useEffect(function () {
        console.log('Categories:', categories);
    }, [categories]);
    var getCategoryName = function (labelId, languageId) {
        var translation = translations.find(function (t) { return t.labelId === labelId && t.languageId === languageId; });
        return translation ? translation.translation : 'Unknown';
    };
    var getParentCategoryName = function (parentId, languageId) {
        if (parentId === null)
            return 'None';
        var parentCategory = categories.find(function (c) { return c.id === parentId; });
        return parentCategory ? getCategoryName(parentCategory.labelId, languageId) : 'Unknown';
    };
    var getCategoryIconUrl = function (iconId) {
        var icon = icons.find(function (icon) { return icon.id === iconId; });
        return icon ? icon.url : '';
    };
    var renderCategory = function (category) { return (react_1["default"].createElement("div", { key: category.id, className: 'border p-4 mb-4' },
        react_1["default"].createElement("h3", { className: 'text-lg font-semibold' }, getCategoryName(category.labelId, 1)),
        react_1["default"].createElement("p", null,
            "Parent Category: ",
            getParentCategoryName(category.parentId, 1)),
        react_1["default"].createElement("div", null, category.iconId ? (getCategoryIconUrl(category.iconId) ? (react_1["default"].createElement(image_1["default"], { src: getCategoryIconUrl(category.iconId), alt: 'Category Icon', width: 50, height: 50 })) : (react_1["default"].createElement("p", null, "Icon not available"))) : (react_1["default"].createElement("p", null, "No icon"))))); };
    var renderCategories = function (categories, parentId) {
        var subcategories = categories.filter(function (c) { return c.parentId === parentId; });
        if (subcategories.length === 0)
            return null;
        return (react_1["default"].createElement("div", { className: 'ml-4' }, subcategories.map(function (category) { return (react_1["default"].createElement("div", { key: category.id },
            renderCategory(category),
            renderCategories(category.subcategories, category.id),
            " ")); })));
    };
    return react_1["default"].createElement("div", null, renderCategories(categories, null)); // Start with top-level categories
};
exports["default"] = CategoryList;
