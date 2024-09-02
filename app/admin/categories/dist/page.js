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
var axios_1 = require("axios");
var CategoryList_1 = require("./CategoryList");
var PageContainer_1 = require("@/app/components/containers/PageContainer");
var CategoryForm_1 = require("./CategoryForm");
var apiClient_1 = require("@/utils/helpers/apiClient");
var ImagePicker_1 = require("./ImagePicker");
var H1_1 = require("@/app/components/text/H1");
var AddCategoryPage = function () {
    var _a = react_1.useState([]), parentIds = _a[0], setParentIds = _a[1]; // Changed to handle multiple parentIds
    var _b = react_1.useState(1), languageId = _b[0], setLanguageId = _b[1];
    var _c = react_1.useState(''), name = _c[0], setName = _c[1];
    var _d = react_1.useState(''), error = _d[0], setError = _d[1];
    var _e = react_1.useState(null), successMessage = _e[0], setSuccessMessage = _e[1];
    var _f = react_1.useState([]), categories = _f[0], setCategories = _f[1];
    var _g = react_1.useState([]), languages = _g[0], setLanguages = _g[1];
    var _h = react_1.useState([]), translations = _h[0], setTranslations = _h[1];
    var _j = react_1.useState([]), icons = _j[0], setIcons = _j[1];
    var _k = react_1.useState(null), icon = _k[0], setIcon = _k[1];
    var _l = react_1.useState(false), isIconPickerOpen = _l[0], setIsIconPickerOpen = _l[1];
    var _m = react_1.useState(false), loading = _m[0], setLoading = _m[1];
    var fileUploadButtonRef = react_1.useRef({});
    var _o = react_1.useState({ iconId: null, iconUrl: null }), currentIcon = _o[0], setCurrentIcon = _o[1];
    var fetchCategories = function () { return apiClient_1["default"]({ method: 'GET', url: '/api/categories' }); };
    var fetchLanguages = function () { return apiClient_1["default"]({ method: 'GET', url: '/api/languages' }); };
    var fetchIcons = function () { return apiClient_1["default"]({ method: 'GET', url: '/api/icons' }); };
    var fetchTranslations = function (languageId) { return __awaiter(void 0, void 0, Promise, function () {
        var labels, translationsPromises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, apiClient_1["default"]({
                        method: 'GET',
                        url: "/api/labels?languageId=" + languageId
                    })];
                case 1:
                    labels = _a.sent();
                    translationsPromises = labels.map(function (_a) {
                        var id = _a.id;
                        return apiClient_1["default"]({
                            method: 'GET',
                            url: "/api/translation?languageId=" + languageId + "&labelId=" + id
                        });
                    });
                    return [4 /*yield*/, Promise.all(translationsPromises)];
                case 2: return [2 /*return*/, (_a.sent()).map(function (res) { return res; })];
            }
        });
    }); };
    var refetchData = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, categoriesData, translationsData, iconsData, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, Promise.all([
                            fetchCategories(),
                            fetchTranslations(languageId),
                            fetchIcons(),
                        ])];
                case 2:
                    _a = _b.sent(), categoriesData = _a[0], translationsData = _a[1], iconsData = _a[2];
                    setCategories(categoriesData);
                    setTranslations(translationsData);
                    setIcons(iconsData);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _b.sent();
                    console.error('Failed to refetch data', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [languageId]);
    react_1.useEffect(function () {
        refetchData();
    }, [refetchData]);
    react_1.useEffect(function () {
        var fetchLanguagesData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, fetchLanguages()];
                    case 2:
                        data = _a.sent();
                        setLanguages(data);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Failed to fetch languages', err_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchLanguagesData();
    }, []);
    react_1.useEffect(function () {
        if (languageId) {
            var fetchTranslationsData = function () { return __awaiter(void 0, void 0, void 0, function () {
                var data, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setLoading(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, fetchTranslations(languageId)];
                        case 2:
                            data = _a.sent();
                            setTranslations(data);
                            return [3 /*break*/, 5];
                        case 3:
                            err_2 = _a.sent();
                            console.error('Failed to fetch translations', err_2);
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
            fetchTranslationsData();
        }
    }, [languageId]);
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var iconId, formData, data, labelData, newLabelId_1, categoryData, translationsArray, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    iconId = currentIcon.iconId;
                    if (!icon) return [3 /*break*/, 3];
                    formData = new FormData();
                    formData.append('icon', icon);
                    return [4 /*yield*/, axios_1["default"].post('/api/icons', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })];
                case 2:
                    data = (_a.sent()).data;
                    iconId = data.iconId;
                    _a.label = 3;
                case 3: return [4 /*yield*/, axios_1["default"].post('/api/labels', { name: name })];
                case 4:
                    labelData = (_a.sent()).data;
                    newLabelId_1 = labelData.id;
                    if (!newLabelId_1)
                        throw new Error('Failed to create label');
                    return [4 /*yield*/, axios_1["default"].post('/api/categories', {
                            parentIds: parentIds,
                            labelId: newLabelId_1,
                            iconId: iconId
                        })];
                case 5:
                    categoryData = (_a.sent()).data;
                    if (!categoryData)
                        throw new Error('Failed to create category');
                    translationsArray = __spreadArrays([
                        {
                            labelId: newLabelId_1,
                            languageId: languageId,
                            translation: name
                        }
                    ], languages
                        .filter(function (lang) { return lang.id !== languageId; }) // Exclude the current language
                        .map(function (lang) { return ({
                        labelId: newLabelId_1,
                        languageId: lang.id,
                        translation: null
                    }); }));
                    if (!translationsArray.length) return [3 /*break*/, 7];
                    return [4 /*yield*/, axios_1["default"].post('/api/translation', { translations: translationsArray })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    resetForm();
                    setSuccessMessage('Kategorija uspešno sačuvana.');
                    if (fileUploadButtonRef.current.resetFileName)
                        fileUploadButtonRef.current.resetFileName();
                    return [4 /*yield*/, refetchData()];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_3 = _a.sent();
                    setError("Submission Error: " + (err_3 instanceof Error ? err_3.message : 'An unexpected error occurred.'));
                    setSuccessMessage(null);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    var handleFileChange = function (file) { return setIcon(file); };
    var handleResetFileName = function () {
        return fileUploadButtonRef.current.resetFileName && fileUploadButtonRef.current.resetFileName();
    };
    var resetForm = function () {
        setName('');
        setParentIds([]); // Reset parentIds to an empty array
        setLanguageId(1);
        setIcon(null);
        setError('');
    };
    var handleEditCategory = react_1.useCallback(function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
        var translations, newIcon, parentIds, iconId, formData, iconData, translationsArray, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    translations = data.translations, newIcon = data.icon, parentIds = data.parentIds;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    iconId = currentIcon.iconId;
                    if (!newIcon) return [3 /*break*/, 3];
                    formData = new FormData();
                    formData.append('icon', newIcon);
                    return [4 /*yield*/, axios_1["default"].post('/api/icons', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })];
                case 2:
                    iconData = (_a.sent()).data;
                    iconId = iconData.iconId; // Update to the new icon ID
                    _a.label = 3;
                case 3:
                    translationsArray = translations.map(function (translation) {
                        var _a;
                        return ({
                            translationId: translation.translationId,
                            languageId: translation.languageId,
                            translation: (_a = translation.translation) !== null && _a !== void 0 ? _a : ''
                        });
                    });
                    // Update category with new icon, translations, and parentIds
                    return [4 /*yield*/, axios_1["default"].put("/api/categories/" + id, {
                            iconId: iconId,
                            parentIds: parentIds,
                            translations: translationsArray,
                            labelId: id
                        })];
                case 4:
                    // Update category with new icon, translations, and parentIds
                    _a.sent();
                    setSuccessMessage('Category updated successfully.');
                    return [4 /*yield*/, refetchData()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_4 = _a.sent();
                    console.error('Failed to update category', err_4);
                    setError("Update Error: " + (err_4 instanceof Error ? err_4.message : 'An unexpected error occurred.'));
                    setSuccessMessage(null);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [currentIcon, refetchData]);
    return (react_1["default"].createElement(PageContainer_1["default"], null,
        react_1["default"].createElement(H1_1["default"], { title: 'KATEGROIJE PROIZVODA' }),
        error && react_1["default"].createElement("p", { className: 'text-red-500 mb-4' }, error),
        successMessage && react_1["default"].createElement("p", { className: 'text-green-500 mb-4' }, successMessage),
        react_1["default"].createElement(CategoryForm_1["default"], { name: name, setName: setName, parentIds: parentIds, setParentIds: setParentIds, translations: translations, icons: icons, onFileChange: handleFileChange, onFileReset: handleResetFileName, onSubmit: handleSubmit, isIconPickerOpen: isIconPickerOpen, setIsIconPickerOpen: setIsIconPickerOpen }),
        react_1["default"].createElement("div", { className: 'mt-8' },
            react_1["default"].createElement(CategoryList_1["default"], { categories: categories, translations: translations, icons: icons, currentIcon: currentIcon, setCurrentIcon: setCurrentIcon, languages: languages, languageId: languageId, refetchCategories: refetchData, onEditCategory: handleEditCategory, onDeleteCategory: function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var err_5;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                return [4 /*yield*/, axios_1["default"]["delete"]("/api/categories/" + id)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, refetchData()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                err_5 = _a.sent();
                                console.error('Failed to delete category', err_5);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, isIconPickerOpen: isIconPickerOpen, setIsIconPickerOpen: setIsIconPickerOpen })),
        react_1["default"].createElement(ImagePicker_1["default"], { icons: icons, isOpen: isIconPickerOpen, onSelect: setCurrentIcon, onClose: function () { return setIsIconPickerOpen(false); } })));
};
exports["default"] = AddCategoryPage;
