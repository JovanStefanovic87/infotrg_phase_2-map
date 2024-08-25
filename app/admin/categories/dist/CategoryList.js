'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var fi_1 = require("react-icons/fi");
var CategoryList = function (_a) {
    var categories = _a.categories, translations = _a.translations, icons = _a.icons, languages = _a.languages, languageId = _a.languageId, refetchCategories = _a.refetchCategories, onEditCategory = _a.onEditCategory, onDeleteCategory = _a.onDeleteCategory;
    var _b = react_1.useState(new Set()), openCategories = _b[0], setOpenCategories = _b[1];
    react_1.useEffect(function () {
        // This ensures the component updates correctly when categories or translations change
        setOpenCategories(new Set());
    }, [categories, translations]);
    var toggleCategory = react_1.useCallback(function (id) {
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
    }, []);
    var getCategoryName = react_1.useCallback(function (labelId, languageId) {
        var translation = translations.find(function (t) { return t.labelId === labelId && t.languageId === languageId; });
        return translation ? translation.translation : 'Unknown';
    }, [translations, languageId]);
    var getLanguageName = react_1.useCallback(function (languageId) {
        var language = languages.find(function (l) { return l.id === languageId; });
        return language ? language.name : 'Unknown';
    }, [languages]);
    var getParentCategoryName = react_1.useCallback(function (parentId, languageId) {
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
    }, [categories, getCategoryName]);
    var getCategoryIconUrl = react_1.useCallback(function (iconId) {
        var icon = icons.find(function (icon) { return icon.id === iconId; });
        return icon ? icon.url : '';
    }, [icons]);
    var getCategoryTranslations = react_1.useCallback(function (labelId) {
        return translations.filter(function (t) { return t.labelId === labelId; });
    }, [translations]);
    var handleEdit = react_1.useCallback(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var newName, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newName = prompt('Enter new category name:');
                    if (newName === null)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, onEditCategory(id, newName)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, refetchCategories()];
                case 3:
                    _a.sent(); // Refetch categories after editing
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error('Failed to edit category', err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [onEditCategory, refetchCategories]);
    var handleDelete = react_1.useCallback(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this category?')) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, onDeleteCategory(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, refetchCategories()];
                case 3:
                    _a.sent(); // Refetch categories after deleting
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    console.error('Failed to delete category', err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [onDeleteCategory, refetchCategories]);
    var CategoryItem = function (_a) {
        var category = _a.category;
        var iconUrl = getCategoryIconUrl(category.iconId);
        var isOpen = openCategories.has(category.id);
        var categoryTranslations = getCategoryTranslations(category.labelId);
        var languagesList = categoryTranslations.map(function (t) { return getLanguageName(t.languageId); }).join(', ');
        return (react_1["default"].createElement("div", { className: 'border p-4 mb-4 rounded-lg shadow-md' },
            react_1["default"].createElement("div", { className: 'flex items-center justify-between' },
                react_1["default"].createElement("h3", { className: 'text-lg font-semibold' }, getCategoryName(category.labelId, languageId)),
                category.subcategories && category.subcategories.length > 0 && (react_1["default"].createElement("button", { className: 'text-blue-500 hover:text-blue-700 focus:outline-none flex items-center', onClick: function () { return toggleCategory(category.id); } },
                    isOpen ? react_1["default"].createElement(fi_1.FiChevronUp, { size: 24 }) : react_1["default"].createElement(fi_1.FiChevronDown, { size: 24 }),
                    react_1["default"].createElement("span", { className: 'ml-2' }, "Potkategorije")))),
            react_1["default"].createElement("div", { className: 'mt-2' }, category.iconId ? (iconUrl ? (react_1["default"].createElement(image_1["default"], { src: iconUrl, alt: 'Category Icon', width: 50, height: 50 })) : (react_1["default"].createElement("p", null, "Slika nije izabrana"))) : (react_1["default"].createElement("p", null, "Ne postoji slika"))),
            react_1["default"].createElement("p", { className: 'mt-2 text-gray-400' },
                react_1["default"].createElement("strong", null, "Nadkategorija:"),
                " ",
                getParentCategoryName(category.parentId, languageId)),
            react_1["default"].createElement("div", { className: 'mt-2' },
                react_1["default"].createElement("strong", null, "Languages:"),
                " ",
                languagesList),
            react_1["default"].createElement("div", { className: 'flex gap-4 mt-2 justify-end' },
                react_1["default"].createElement("button", { className: 'text-blue-500 hover:text-blue-700 flex items-center', onClick: function () { return handleEdit(category.id); } },
                    react_1["default"].createElement(fi_1.FiEdit, { size: 20 }),
                    react_1["default"].createElement("span", { className: 'ml-1' }, "Izmeni")),
                react_1["default"].createElement("button", { className: 'text-red-500 hover:text-red-700 flex items-center', onClick: function () { return handleDelete(category.id); } },
                    react_1["default"].createElement(fi_1.FiTrash, { size: 20 }),
                    react_1["default"].createElement("span", { className: 'ml-1' }, "Obri\u0161i")))));
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
