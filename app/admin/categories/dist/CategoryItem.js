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
var axios_1 = require("axios");
var image_1 = require("next/image");
var universalFunctions_1 = require("../../../utils/helpers/universalFunctions");
var H4_1 = require("../../components/text/H4");
var TextNormal_1 = require("../../components/text/TextNormal");
var TextWrapped_1 = require("../../components/text/TextWrapped");
var ArrowToggleButton_1 = require("../../components/buttons/ArrowToggleButton");
var EditButton_1 = require("../../components/buttons/EditButton");
var DeleteButton_1 = require("../../components/buttons/DeleteButton");
var CategoryItem = function (_a) {
    var category = _a.category, icons = _a.icons, translations = _a.translations, languages = _a.languages, languageId = _a.languageId, setCurrentIcon = _a.setCurrentIcon, setCurrentEditCategory = _a.setCurrentEditCategory, setParentIds = _a.setParentIds, setNewTranslations = _a.setNewTranslations, setNewIcon = _a.setNewIcon, setIsModalOpen = _a.setIsModalOpen, handleDelete = _a.handleDelete;
    var _b = react_1.useState(new Set()), openCategories = _b[0], setOpenCategories = _b[1];
    var iconUrl = universalFunctions_1.getCategoryIconUrl(category.iconId, icons);
    var isOpen = openCategories.has(category.id);
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
    var getCategoryTranslations = react_1.useCallback(function (labelId) {
        return translations.filter(function (t) { return t.labelId === labelId; });
    }, [translations]);
    var getLanguageName = react_1.useCallback(function (languageId) {
        var language = languages.find(function (l) { return l.id === languageId; });
        return language ? language.name : 'Unknown';
    }, [languages]);
    var getCategoryName = react_1.useCallback(function (labelId, languageId) {
        var translation = translations.find(function (t) { return t.labelId === labelId && t.languageId === languageId; });
        if (translation && translation.translation) {
            return translation.translation.charAt(0).toUpperCase() + translation.translation.slice(1);
        }
        return 'Unknown';
    }, [translations]);
    var getParentCategoryNames = react_1.useCallback(function (parents, languageId) {
        if (parents.length === 0)
            return 'Ovo je glavna kategorija';
        return parents.map(function (parent) { return getCategoryName(parent.labelId, languageId); }).join(', ');
    }, [getCategoryName]);
    var handleOpenEditModal = react_1.useCallback(function (category) { return __awaiter(void 0, void 0, void 0, function () {
        var categoryTranslations_1, existingTranslations, iconId, iconUrl_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setCurrentEditCategory(category);
                    setParentIds(category.parents.map(function (parent) { return parent.id; }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("/api/translation/labels/" + category.labelId)];
                case 2:
                    categoryTranslations_1 = (_a.sent()).data;
                    existingTranslations = categoryTranslations_1.map(function (t) {
                        return {
                            translationId: t.id,
                            languageId: t.languageId,
                            translation: t.translation,
                            description: t.description || '',
                            synonyms: t.synonyms.map(function (s) { return s.synonym; })
                        };
                    });
                    setNewTranslations(existingTranslations);
                    iconId = category.iconId || null;
                    iconUrl_1 = universalFunctions_1.getCategoryIconUrl(iconId, icons);
                    setCurrentIcon({
                        iconId: iconId,
                        iconUrl: iconUrl_1
                    });
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
    }); }, [universalFunctions_1.getCategoryIconUrl, languages]);
    var categoryTranslations = getCategoryTranslations(category.labelId);
    return (react_1["default"].createElement("div", { className: 'border p-4 mb-4 rounded-lg shadow-md bg-white' },
        react_1["default"].createElement(H4_1["default"], { text: getCategoryName(category.labelId, languageId), color: 'black', shouldBreak: true }),
        react_1["default"].createElement("div", { className: 'mt-2' }, category.iconId ? (iconUrl ? (react_1["default"].createElement(image_1["default"], { src: iconUrl, alt: 'Category Icon', width: 50, height: 50 })) : (react_1["default"].createElement("p", null, "Ikonica nije izabrana"))) : (react_1["default"].createElement("p", null, "Ikonica ne postoji"))),
        react_1["default"].createElement(TextNormal_1["default"], { text: "Nadkategorije:", weight: 'bold' }),
        react_1["default"].createElement(TextWrapped_1["default"], { block: getParentCategoryNames(category.parents, languageId) }),
        react_1["default"].createElement("div", { className: 'mt-4 flex space-x-2' },
            react_1["default"].createElement(EditButton_1["default"], { onClick: function () { return handleOpenEditModal(category); } }),
            react_1["default"].createElement(DeleteButton_1["default"], { onClick: function () { return handleDelete(category.id); } })),
        category.children && category.children.length > 0 && (react_1["default"].createElement("div", { className: 'flex justify-center items-center py-2 bg-black rounded-lg mt-4', onClick: function () { return toggleCategory(category.id); } },
            react_1["default"].createElement(ArrowToggleButton_1["default"], { isOpen: isOpen, onClick: function () { }, title: 'Potkategroije' }))),
        category.children && isOpen && (react_1["default"].createElement("div", { className: 'mt-4 pl-4' }, category.children.map(function (subCategory) { return (react_1["default"].createElement(CategoryItem, { key: subCategory.id, category: subCategory, icons: icons, translations: translations, languages: languages, languageId: languageId, setCurrentIcon: setCurrentIcon, setCurrentEditCategory: setCurrentEditCategory, setParentIds: setParentIds, setNewTranslations: setNewTranslations, setNewIcon: setNewIcon, setIsModalOpen: setIsModalOpen, handleDelete: handleDelete })); })))));
};
exports["default"] = CategoryItem;
