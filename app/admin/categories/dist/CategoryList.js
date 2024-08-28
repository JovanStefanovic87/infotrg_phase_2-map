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
var CustomModal_1 = require("@/app/components/modals/CustomModal");
var axios_1 = require("axios");
var CategoryList = function (_a) {
    var categories = _a.categories, translations = _a.translations, icons = _a.icons, languages = _a.languages, languageId = _a.languageId, refetchCategories = _a.refetchCategories, onEditCategory = _a.onEditCategory, onDeleteCategory = _a.onDeleteCategory;
    var _b = react_1.useState(new Set()), openCategories = _b[0], setOpenCategories = _b[1];
    var _c = react_1.useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    var _d = react_1.useState(null), currentEditCategory = _d[0], setCurrentEditCategory = _d[1];
    var _e = react_1.useState({}), translationsByLanguage = _e[0], setTranslationsByLanguage = _e[1];
    var _f = react_1.useState(null), newIcon = _f[0], setNewIcon = _f[1];
    var _g = react_1.useState([]), newTranslations = _g[0], setNewTranslations = _g[1];
    react_1.useEffect(function () {
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
    }, [translations]);
    var getLanguageName = react_1.useCallback(function (languageId) {
        var language = languages.find(function (l) { return l.id === languageId; });
        return language ? language.name : 'Unknown';
    }, [languages]);
    // Updated to handle multiple parent categories
    var getParentCategoryNames = react_1.useCallback(function (parents, languageId) {
        if (parents.length === 0)
            return 'This is a main category';
        // Map through parent categories and get their names
        return parents.map(function (parent) { return getCategoryName(parent.labelId, languageId); }).join(', ');
    }, [getCategoryName]);
    var getCategoryIconUrl = react_1.useCallback(function (iconId) {
        var icon = icons.find(function (icon) { return icon.id === iconId; });
        return icon ? icon.url : '';
    }, [icons]);
    var getCategoryTranslations = react_1.useCallback(function (labelId) {
        return translations.filter(function (t) { return t.labelId === labelId; });
    }, [translations]);
    var handleOpenEditModal = react_1.useCallback(function (category) { return __awaiter(void 0, void 0, void 0, function () {
        var categoryTranslations_1, translationsMap, existingTranslations, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setCurrentEditCategory(category);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("/api/translation/labels/" + category.labelId)];
                case 2:
                    categoryTranslations_1 = (_a.sent()).data;
                    translationsMap = languages.reduce(function (acc, lang) {
                        var translation = categoryTranslations_1.find(function (t) { return t.languageId === lang.id; });
                        acc[lang.id] = translation ? translation.translation : '';
                        return acc;
                    }, {});
                    setTranslationsByLanguage(translationsMap);
                    existingTranslations = categoryTranslations_1.map(function (t) { return ({
                        translationId: t.id,
                        languageId: t.languageId,
                        translation: t.translation
                    }); });
                    setNewTranslations(existingTranslations);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to fetch category translations', error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setNewIcon(null);
                    setIsModalOpen(true);
                    return [2 /*return*/];
            }
        });
    }); }, [languages]);
    var handleSubmitEdit = react_1.useCallback(function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var iconId, formData, iconData, translationUpdates, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!currentEditCategory)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    iconId = undefined;
                    if (!newIcon) return [3 /*break*/, 3];
                    formData = new FormData();
                    formData.append('icon', newIcon);
                    return [4 /*yield*/, axios_1["default"].post('/api/icons', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })];
                case 2:
                    iconData = (_a.sent()).data;
                    iconId = iconData.id;
                    _a.label = 3;
                case 3:
                    translationUpdates = newTranslations.map(function (_a) {
                        var translationId = _a.translationId, languageId = _a.languageId, translation = _a.translation;
                        return ({
                            translationId: translationId,
                            languageId: languageId,
                            translation: translation
                        });
                    });
                    // Batch update translations
                    return [4 /*yield*/, axios_1["default"].put('/api/translation/translations', {
                            translations: translationUpdates
                        })];
                case 4:
                    // Batch update translations
                    _a.sent();
                    // Call the edit category API
                    return [4 /*yield*/, onEditCategory(currentEditCategory.id, {
                            translations: translationUpdates,
                            icon: newIcon
                        })];
                case 5:
                    // Call the edit category API
                    _a.sent();
                    setIsModalOpen(false);
                    return [4 /*yield*/, refetchCategories()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.error('Failed to edit category', err_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); }, [currentEditCategory, newTranslations, newIcon, onEditCategory, refetchCategories]);
    var handleFileChange = react_1.useCallback(function (e) {
        if (e.target.files && e.target.files[0]) {
            setNewIcon(e.target.files[0]);
        }
        else {
            setNewIcon(null);
        }
    }, []);
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
    var CategoryItem = function (_a) {
        var category = _a.category;
        var iconUrl = getCategoryIconUrl(category.iconId);
        var isOpen = openCategories.has(category.id);
        var categoryTranslations = getCategoryTranslations(category.labelId);
        var languagesList = categoryTranslations.map(function (t) { return getLanguageName(t.languageId); }).join(', ');
        return (react_1["default"].createElement("div", { className: 'border p-4 mb-4 rounded-lg shadow-md' },
            react_1["default"].createElement("div", { className: 'flex items-center justify-between' },
                react_1["default"].createElement("h3", { className: 'text-lg font-semibold' }, getCategoryName(category.labelId, languageId)),
                category.children && category.children.length > 0 && (react_1["default"].createElement("button", { className: 'text-blue-500 hover:text-blue-700 focus:outline-none flex items-center', onClick: function () { return toggleCategory(category.id); } },
                    isOpen ? react_1["default"].createElement(fi_1.FiChevronUp, { size: 24 }) : react_1["default"].createElement(fi_1.FiChevronDown, { size: 24 }),
                    react_1["default"].createElement("span", { className: 'ml-2' }, "Subcategories")))),
            react_1["default"].createElement("div", { className: 'mt-2' }, category.iconId ? (iconUrl ? (react_1["default"].createElement(image_1["default"], { src: iconUrl, alt: 'Category Icon', width: 50, height: 50 })) : (react_1["default"].createElement("p", null, "No image selected"))) : (react_1["default"].createElement("p", null, "No image available"))),
            react_1["default"].createElement("p", { className: 'mt-2 text-gray-600' },
                "Parent Categories: ",
                getParentCategoryNames(category.parents, languageId)),
            react_1["default"].createElement("p", { className: 'mt-2 text-gray-600' },
                "Languages: ",
                languagesList),
            react_1["default"].createElement("div", { className: 'mt-4 flex space-x-2' },
                react_1["default"].createElement("button", { className: 'bg-blue-500 text-white px-4 py-2 rounded', onClick: function () { return handleOpenEditModal(category); } }, "Edit"),
                react_1["default"].createElement("button", { className: 'bg-red-500 text-white px-4 py-2 rounded', onClick: function () { return handleDelete(category.id); } }, "Delete")),
            category.children && isOpen && (react_1["default"].createElement("div", { className: 'mt-4 pl-4' }, category.children.map(function (subCategory) { return (react_1["default"].createElement(CategoryItem, { key: subCategory.id, category: subCategory })); })))));
    };
    return (react_1["default"].createElement("div", null,
        categories.map(function (category) { return (react_1["default"].createElement(CategoryItem, { key: category.id, category: category })); }),
        isModalOpen && currentEditCategory && (react_1["default"].createElement(CustomModal_1["default"], { isOpen: isModalOpen, onRequestClose: function () { return setIsModalOpen(false); } }, currentEditCategory && (react_1["default"].createElement("form", { onSubmit: handleSubmitEdit, className: 'space-y-4' },
            react_1["default"].createElement("div", { className: 'flex flex-col' },
                react_1["default"].createElement("label", { htmlFor: 'icon', className: 'font-semibold' }, "Icon"),
                react_1["default"].createElement("input", { type: 'file', id: 'icon', className: 'text-black', name: 'icon', accept: 'image/*', onChange: handleFileChange })),
            languages.map(function (language) {
                var _a;
                return (react_1["default"].createElement("div", { key: language.id, className: 'flex flex-col' },
                    react_1["default"].createElement("label", { htmlFor: "translation-" + language.id, className: 'font-semibold' }, language.name),
                    react_1["default"].createElement("input", { type: 'text', id: "translation-" + language.id, className: 'text-black', value: ((_a = newTranslations.find(function (t) { return t.languageId === language.id; })) === null || _a === void 0 ? void 0 : _a.translation) || '', onChange: function (e) {
                            var translation = e.target.value;
                            setNewTranslations(function (prevTranslations) {
                                return prevTranslations.map(function (t) {
                                    return t.languageId === language.id ? __assign(__assign({}, t), { translation: translation }) : t;
                                });
                            });
                        } })));
            }),
            react_1["default"].createElement("button", { type: 'submit', className: 'bg-blue-500 text-white py-2 px-4 rounded' }, "Save Changes")))))));
};
exports["default"] = CategoryList;
