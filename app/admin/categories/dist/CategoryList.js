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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var CustomModal_1 = require("@/app/components/modals/CustomModal");
var axios_1 = require("axios");
var CategoryItem_1 = require("./CategoryItem");
var EditCategoryForm_1 = require("./EditCategoryForm");
var CategoryList = function (_a) {
    var categories = _a.categories, translations = _a.translations, icons = _a.icons, currentIcon = _a.currentIcon, setCurrentIcon = _a.setCurrentIcon, languages = _a.languages, languageId = _a.languageId, refetchCategories = _a.refetchCategories, onEditCategory = _a.onEditCategory, onDeleteCategory = _a.onDeleteCategory, setIsIconPickerOpen = _a.setIsIconPickerOpen;
    var _b = react_1.useState(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = react_1.useState(null), currentEditCategory = _c[0], setCurrentEditCategory = _c[1];
    var _d = react_1.useState(null), newIcon = _d[0], setNewIcon = _d[1];
    var _e = react_1.useState([]), newTranslations = _e[0], setNewTranslations = _e[1];
    var _f = react_1.useState([]), parentIds = _f[0], setParentIds = _f[1];
    var handleSubmitEdit = react_1.useCallback(function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var iconId, formData, iconData, translationUpdates, _i, translationUpdates_1, _a, translationId, synonyms, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    event.preventDefault();
                    if (!currentEditCategory)
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    iconId = currentIcon.iconId;
                    if (!newIcon) return [3 /*break*/, 3];
                    formData = new FormData();
                    formData.append('icon', newIcon);
                    return [4 /*yield*/, axios_1["default"].post('/api/icons', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })];
                case 2:
                    iconData = (_b.sent()).data;
                    iconId = iconData.id;
                    _b.label = 3;
                case 3:
                    translationUpdates = newTranslations.map(function (_a) {
                        var translationId = _a.translationId, languageId = _a.languageId, translation = _a.translation, description = _a.description, synonyms = _a.synonyms;
                        return ({
                            translationId: translationId,
                            languageId: languageId,
                            translation: translation,
                            description: description,
                            synonyms: synonyms || []
                        });
                    });
                    return [4 /*yield*/, axios_1["default"].put("/api/categories/" + currentEditCategory.id, {
                            iconId: iconId,
                            parentIds: parentIds,
                            translations: translationUpdates,
                            labelId: currentEditCategory.labelId
                        })];
                case 4:
                    _b.sent();
                    _i = 0, translationUpdates_1 = translationUpdates;
                    _b.label = 5;
                case 5:
                    if (!(_i < translationUpdates_1.length)) return [3 /*break*/, 8];
                    _a = translationUpdates_1[_i], translationId = _a.translationId, synonyms = _a.synonyms;
                    console.log('synonyms-fe', synonyms);
                    return [4 /*yield*/, axios_1["default"].post('/api/synonyms', {
                            translationId: translationId,
                            synonyms: synonyms
                        })];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8:
                    setIsModalOpen(false);
                    return [4 /*yield*/, refetchCategories()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 10:
                    err_1 = _b.sent();
                    console.error('Failed to edit category', err_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); }, [
        currentEditCategory,
        newTranslations,
        newIcon,
        onEditCategory,
        parentIds,
        refetchCategories,
        currentIcon,
    ]);
    var handleFileChange = function (event) {
        if (event.target.files) {
            setNewIcon(event.target.files[0]);
        }
    };
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
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    console.error('Failed to delete category', err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [onDeleteCategory, refetchCategories]);
    // Helper function to filter categories for select input
    var filterCategoriesForSelect = react_1.useCallback(function () {
        if (!currentEditCategory)
            return categories;
        var completeBranch = getCompleteBranch(currentEditCategory);
        var uniqueCategories = categories.filter(function (cat) { return !completeBranch.has(cat.id); });
        return uniqueCategories;
    }, [categories, currentEditCategory]);
    // Helper function to get all descendants of a category
    var getDescendants = function (category, descendants) {
        if (descendants === void 0) { descendants = new Set(); }
        category.children.forEach(function (child) {
            descendants.add(child.id);
            getDescendants(child, descendants);
        });
        return descendants;
    };
    // Helper function to get all ancestors of a category
    var getAncestors = function (category, ancestors) {
        if (ancestors === void 0) { ancestors = new Set(); }
        category.parents.forEach(function (parent) {
            ancestors.add(parent.id);
            var parentCategory = categories.find(function (cat) { return cat.id === parent.id; });
            if (parentCategory) {
                getAncestors(parentCategory, ancestors);
            }
        });
        return ancestors;
    };
    var getCategoryName = react_1.useCallback(function (labelId, languageId) {
        var translation = translations.find(function (t) { return t.labelId === labelId && t.languageId === languageId; });
        if (translation && translation.translation) {
            return translation.translation.charAt(0).toUpperCase() + translation.translation.slice(1);
        }
        return 'Unknown';
    }, [translations]);
    // Sort categories alphabetically based on category name
    var sortedCategories = __spreadArrays(categories).sort(function (a, b) {
        var nameA = getCategoryName(a.labelId, languageId).toLowerCase();
        var nameB = getCategoryName(b.labelId, languageId).toLowerCase();
        return nameA.localeCompare(nameB);
    });
    // Helper function to get the complete branch (all descendants and ancestors) of a category
    var getCompleteBranch = function (category) {
        var branch = new Set();
        branch.add(category.id); // Add the category itself
        var descendants = getDescendants(category);
        var ancestors = getAncestors(category);
        descendants.forEach(function (id) { return branch.add(id); });
        ancestors.forEach(function (id) { return branch.add(id); });
        return branch;
    };
    return (react_1["default"].createElement("div", null,
        sortedCategories.map(function (category) { return (react_1["default"].createElement(CategoryItem_1["default"], { key: category.id, category: category, icons: icons, translations: translations, languages: languages, languageId: languageId, handleDelete: handleDelete, setCurrentIcon: setCurrentIcon, setCurrentEditCategory: setCurrentEditCategory, setParentIds: setParentIds, setNewIcon: setNewIcon, setIsModalOpen: setIsModalOpen, setNewTranslations: setNewTranslations })); }),
        isModalOpen && currentEditCategory && (react_1["default"].createElement(CustomModal_1["default"], { isOpen: isModalOpen, onRequestClose: function () { return setIsModalOpen(false); }, mt: '10' },
            react_1["default"].createElement(EditCategoryForm_1["default"], { categories: categories, currentIcon: currentIcon, newIcon: newIcon, filterCategoriesForSelect: filterCategoriesForSelect, handleFileChange: handleFileChange, handleSubmitEdit: handleSubmitEdit, languages: languages, newTranslations: newTranslations, parentIds: parentIds, setNewTranslations: setNewTranslations, setParentIds: setParentIds, setIsIconPickerOpen: setIsIconPickerOpen, translations: translations })))));
};
exports["default"] = CategoryList;
