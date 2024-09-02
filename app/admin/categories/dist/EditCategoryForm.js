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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var H2_1 = require("../../components/text/H2");
var image_1 = require("next/image");
var TextBlockItem_1 = require("../../ulaganje/collapsible/TextBlockItem");
var ImageUploadButton_1 = require("../../components/buttons/ImageUploadButton");
var ChooseImageButton_1 = require("../../components/buttons/ChooseImageButton");
var CustomCombobox_1 = require("../../components/input/CustomCombobox");
var SubmitButton_1 = require("../../components/buttons/SubmitButton");
var EditCategoryForm = function (_a) {
    var currentIcon = _a.currentIcon, newIcon = _a.newIcon, languages = _a.languages, newTranslations = _a.newTranslations, handleFileChange = _a.handleFileChange, setNewTranslations = _a.setNewTranslations, parentIds = _a.parentIds, categories = _a.categories, translations = _a.translations, setParentIds = _a.setParentIds, filterCategoriesForSelect = _a.filterCategoriesForSelect, setIsIconPickerOpen = _a.setIsIconPickerOpen, handleSubmitEdit = _a.handleSubmitEdit;
    return (react_1["default"].createElement("form", { onSubmit: handleSubmitEdit, className: 'flex flex-col items-center space-y-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto overflow-auto max-h-[85vh] lg:max-h-[90vh]' },
        react_1["default"].createElement("div", { className: 'flex flex-col items-center text-black mb-6 w-full' },
            react_1["default"].createElement("div", { className: 'mb-4' },
                react_1["default"].createElement(H2_1["default"], { text: 'KATEGROIJA PROIZVODA', color: 'black' })),
            currentIcon.iconUrl && !newIcon ? (react_1["default"].createElement("div", { className: 'mb-4 flex gap-4 justify-center items-center w-full' },
                react_1["default"].createElement(TextBlockItem_1["default"], { content: 'Trenutna ikonica:' }),
                react_1["default"].createElement(image_1["default"], { src: currentIcon.iconUrl, alt: 'Current Icon', width: 50, height: 50 }))) : (react_1["default"].createElement("p", { className: 'text-gray-500 mb-4' }, "No icon selected")),
            react_1["default"].createElement("div", { className: 'flex w-full justify-between space-x-4' },
                react_1["default"].createElement(ImageUploadButton_1["default"], { id: 'iconUpload', label: 'Nova ikonica (PNG)', onChange: handleFileChange }),
                react_1["default"].createElement(ChooseImageButton_1["default"], { onClick: function () { return setIsIconPickerOpen(true); }, label: 'Izbor ikonice' }))),
        react_1["default"].createElement("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-6 w-full' }, languages.map(function (language) {
            var _a, _b, _c;
            return (react_1["default"].createElement("div", { key: language.id, className: 'flex flex-col text-black space-y-4' },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "translation-" + language.id, className: 'font-semibold mb-1 block text-lg' }, "" + language.name.charAt(0).toUpperCase() + language.name
                        .slice(1)
                        .toLocaleLowerCase() + " naziv"),
                    react_1["default"].createElement("input", { type: 'text', id: "translation-" + language.id, className: 'border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500', value: ((_a = newTranslations.find(function (t) { return t.languageId === language.id; })) === null || _a === void 0 ? void 0 : _a.translation) || '', onChange: function (e) {
                            var translation = e.target.value;
                            setNewTranslations(function (prevTranslations) {
                                return prevTranslations.map(function (t) {
                                    return t.languageId === language.id ? __assign(__assign({}, t), { translation: translation }) : t;
                                });
                            });
                        } })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "description-" + language.id, className: 'font-semibold mb-1 block text-lg' }, "" + language.name.charAt(0).toUpperCase() + language.name
                        .slice(1)
                        .toLocaleLowerCase() + " opis"),
                    react_1["default"].createElement("textarea", { id: "description-" + language.id, className: 'border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500', value: ((_b = newTranslations.find(function (t) { return t.languageId === language.id; })) === null || _b === void 0 ? void 0 : _b.description) || '', onChange: function (e) {
                            var description = e.target.value;
                            setNewTranslations(function (prevTranslations) {
                                return prevTranslations.map(function (t) {
                                    return t.languageId === language.id ? __assign(__assign({}, t), { description: description }) : t;
                                });
                            });
                        } })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "synonyms-" + language.id, className: 'font-semibold mb-1 block text-lg' }, "" + language.name.charAt(0).toUpperCase() + language.name
                        .slice(1)
                        .toLocaleLowerCase() + " sinonimi"),
                    react_1["default"].createElement("input", { type: 'text', placeholder: 'Odvojite ih zarezom', className: 'border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500', value: ((_c = newTranslations.find(function (t) { return t.languageId === language.id; })) === null || _c === void 0 ? void 0 : _c.synonyms.join(', ')) || '', onChange: function (e) {
                            var synonyms = e.target.value.split(',').map(function (synonym) { return synonym.trim(); });
                            setNewTranslations(function (prevTranslations) {
                                return prevTranslations.map(function (t) {
                                    return t.languageId === language.id ? __assign(__assign({}, t), { synonyms: synonyms }) : t;
                                });
                            });
                        } }))));
        })),
        react_1["default"].createElement("div", { className: 'mb-6 w-full' },
            react_1["default"].createElement("label", { className: 'font-semibold text-lg mb-3 block text-black' }, "Izabrane nadkategorije:"),
            react_1["default"].createElement("ul", { className: 'list-disc pl-5 text-black space-y-2 mb-4 max-h-48 overflow-y-auto' }, __spreadArrays(new Set(parentIds)).length > 0 ? (__spreadArrays(new Set(parentIds)).map(function (parentId) {
                var parentCategory = categories.find(function (cat) { return cat.id === parentId; });
                var translation = translations.find(function (t) { return t.labelId === (parentCategory === null || parentCategory === void 0 ? void 0 : parentCategory.labelId) && t.languageId === 1; });
                return (react_1["default"].createElement("li", { key: "parent-" + parentId, className: 'flex items-center justify-between' },
                    react_1["default"].createElement("span", { className: 'text-sm text-gray-800' }, translation ? translation.translation : 'Translation not available'),
                    react_1["default"].createElement("button", { type: 'button', onClick: function () { return setParentIds(parentIds.filter(function (id) { return id !== parentId; })); }, className: 'ml-4 text-red-500 hover:text-red-700 focus:outline-none' }, "Ukloni")));
            })) : (react_1["default"].createElement("li", { className: 'text-sm text-gray-500' }, "Ovo je glavna kategorija"))),
            react_1["default"].createElement(CustomCombobox_1["default"], { options: filterCategoriesForSelect().map(function (cat) {
                    var _a;
                    var translation = translations.find(function (t) { return t.labelId === cat.labelId && t.languageId === 1; });
                    return {
                        id: (translation === null || translation === void 0 ? void 0 : translation.id) || cat.id,
                        labelId: cat.id,
                        languageId: 1,
                        translation: (translation === null || translation === void 0 ? void 0 : translation.translation) || 'Ne postoji prevod',
                        description: (translation === null || translation === void 0 ? void 0 : translation.description) || '',
                        createdAt: (translation === null || translation === void 0 ? void 0 : translation.createdAt) || new Date(),
                        synonyms: (translation === null || translation === void 0 ? void 0 : translation.synonyms) || [],
                        translationId: (_a = translation === null || translation === void 0 ? void 0 : translation.translationId) !== null && _a !== void 0 ? _a : null
                    };
                }), selectedOptions: translations.filter(function (t) { return parentIds.includes(t.labelId); }), onSelect: function (selectedOptions) {
                    var newParentIds = selectedOptions.map(function (option) { return option.labelId; });
                    setParentIds(newParentIds);
                }, placeholder: 'Izaberite nadkategorije' })),
        react_1["default"].createElement("div", { className: 'flex justify-center mt-6' },
            react_1["default"].createElement(SubmitButton_1["default"], null, "SA\u010CUVAJ"))));
};
exports["default"] = EditCategoryForm;
