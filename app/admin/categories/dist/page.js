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
var FileUploadButton_1 = require("@/app/components/buttons/FileUploadButton");
var CategoryList_1 = require("./CategoryList");
var CustomCombobox_1 = require("@/app/components/input/CustomCombobox");
var PageContainer_1 = require("@/app/components/containers/PageContainer");
var AddCategoryPage = function () {
    var _a = react_1.useState(null), parentId = _a[0], setParentId = _a[1];
    var _b = react_1.useState(1), languageId = _b[0], setLanguageId = _b[1];
    var _c = react_1.useState(''), name = _c[0], setName = _c[1];
    var _d = react_1.useState(''), error = _d[0], setError = _d[1];
    var _e = react_1.useState(null), successMessage = _e[0], setSuccessMessage = _e[1];
    var _f = react_1.useState([]), categories = _f[0], setCategories = _f[1];
    var _g = react_1.useState([]), languages = _g[0], setLanguages = _g[1];
    var _h = react_1.useState([]), translations = _h[0], setTranslations = _h[1];
    var _j = react_1.useState([]), icons = _j[0], setIcons = _j[1];
    var _k = react_1.useState(null), icon = _k[0], setIcon = _k[1];
    var _l = react_1.useState(false), loadingCategories = _l[0], setLoadingCategories = _l[1];
    var _m = react_1.useState(false), loadingLanguages = _m[0], setLoadingLanguages = _m[1];
    var _o = react_1.useState(false), loadingTranslations = _o[0], setLoadingTranslations = _o[1];
    var _p = react_1.useState(false), loadingIcons = _p[0], setLoadingIcons = _p[1];
    var fileUploadButtonRef = react_1.useRef({});
    react_1.useEffect(function () {
        var fetchCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoadingCategories(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, axios_1["default"].get('/api/categories')];
                    case 2:
                        response = _a.sent();
                        setCategories(response.data);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Failed to fetch categories', err_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoadingCategories(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchCategories();
    }, []);
    react_1.useEffect(function () {
        var fetchLanguages = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoadingLanguages(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, axios_1["default"].get('/api/languages')];
                    case 2:
                        response = _a.sent();
                        setLanguages(response.data);
                        return [3 /*break*/, 5];
                    case 3:
                        err_2 = _a.sent();
                        console.error('Failed to fetch languages', err_2);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoadingLanguages(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchLanguages();
    }, []);
    react_1.useEffect(function () {
        if (languageId) {
            var fetchLabels = function () { return __awaiter(void 0, void 0, void 0, function () {
                var response, labels_1, fetchTranslations, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setLoadingTranslations(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, axios_1["default"].get('/api/labels', { params: { languageId: languageId } })];
                        case 2:
                            response = _a.sent();
                            labels_1 = Array.isArray(response.data) ? response.data : [];
                            fetchTranslations = function () { return __awaiter(void 0, void 0, void 0, function () {
                                var translationResponses, allTranslations, err_4;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, 3, 4]);
                                            return [4 /*yield*/, Promise.all(labels_1.map(function (label) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var response;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, axios_1["default"].get('/api/translation', {
                                                                    params: {
                                                                        languageId: languageId,
                                                                        labelId: label.id
                                                                    }
                                                                })];
                                                            case 1:
                                                                response = _a.sent();
                                                                return [2 /*return*/, response.data];
                                                        }
                                                    });
                                                }); }))];
                                        case 1:
                                            translationResponses = _a.sent();
                                            allTranslations = translationResponses.flat();
                                            setTranslations(allTranslations);
                                            return [3 /*break*/, 4];
                                        case 2:
                                            err_4 = _a.sent();
                                            console.error('Failed to fetch translation', err_4);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            setLoadingTranslations(false);
                                            return [7 /*endfinally*/];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); };
                            fetchTranslations();
                            return [3 /*break*/, 4];
                        case 3:
                            err_3 = _a.sent();
                            console.error('Failed to fetch labels', err_3);
                            setLoadingTranslations(false);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            fetchLabels();
        }
    }, [languageId]);
    react_1.useEffect(function () {
        var fetchIcons = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoadingIcons(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, axios_1["default"].get('/api/icons')];
                    case 2:
                        response = _a.sent();
                        setIcons(response.data);
                        return [3 /*break*/, 5];
                    case 3:
                        err_5 = _a.sent();
                        console.error('Failed to fetch icons', err_5);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoadingIcons(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchIcons();
    }, []);
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var iconId, formData, uploadResponse, labelResponse, newLabelId, categoryResponse, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    iconId = 0;
                    if (!icon) return [3 /*break*/, 3];
                    formData = new FormData();
                    formData.append('icon', icon);
                    return [4 /*yield*/, axios_1["default"].post('/api/icons', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })];
                case 2:
                    uploadResponse = _a.sent();
                    iconId = uploadResponse.data.iconId;
                    _a.label = 3;
                case 3: return [4 /*yield*/, axios_1["default"].post('/api/labels', { name: name })];
                case 4:
                    labelResponse = _a.sent();
                    newLabelId = labelResponse.data.id;
                    if (!newLabelId) {
                        throw new Error('Failed to create label');
                    }
                    return [4 /*yield*/, axios_1["default"].post('/api/categories', {
                            parentId: parentId,
                            labelId: newLabelId,
                            iconId: iconId
                        })];
                case 5:
                    categoryResponse = _a.sent();
                    if (!categoryResponse.data) {
                        throw new Error('Failed to create category');
                    }
                    if (!languageId) return [3 /*break*/, 7];
                    return [4 /*yield*/, axios_1["default"].post('/api/translation', {
                            labelId: newLabelId,
                            languageId: languageId,
                            translation: name
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    setName('');
                    setParentId(null);
                    setLanguageId(1);
                    setIcon(null);
                    setError('');
                    setSuccessMessage('Podaci uspešno sačuvani.');
                    if (fileUploadButtonRef.current.resetFileName) {
                        fileUploadButtonRef.current.resetFileName();
                    }
                    return [3 /*break*/, 9];
                case 8:
                    err_6 = _a.sent();
                    if (err_6 instanceof Error) {
                        setError("Submission Error: " + err_6.message);
                        setSuccessMessage(null);
                    }
                    else {
                        setError('An unexpected error occurred.');
                        setSuccessMessage(null);
                    }
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleFileChange = function (file) {
        setIcon(file);
    };
    var handleResetFileName = function () {
        if (fileUploadButtonRef.current.resetFileName) {
            fileUploadButtonRef.current.resetFileName();
        }
    };
    if (loadingCategories || loadingIcons)
        return react_1["default"].createElement("p", null, "Loading...");
    return (react_1["default"].createElement(PageContainer_1["default"], null,
        react_1["default"].createElement("h1", { className: 'text-xl font-bold mb-4' }, "Add New Category"),
        error && react_1["default"].createElement("p", { className: 'text-red-500 mb-4' }, error),
        successMessage && react_1["default"].createElement("p", { className: 'text-green-500 mb-4' }, successMessage),
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: 'space-y-4' },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", { htmlFor: 'name', className: 'block mb-2' }, "Category Name:"),
                react_1["default"].createElement("input", { type: 'text', id: 'name', value: name, onChange: function (e) { return setName(e.target.value); }, className: 'border p-2 w-full text-black' })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", { htmlFor: 'parentId', className: 'block mb-2' }, "Parent Category (optional):"),
                react_1["default"].createElement(CustomCombobox_1["default"], { options: translations, onSelect: function (selectedOption) {
                        setParentId(selectedOption ? selectedOption.labelId : null);
                    }, placeholder: 'Select Parent Category' })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", { htmlFor: 'icon', className: 'block mb-2' }, "Icon:"),
                react_1["default"].createElement(FileUploadButton_1["default"], { onFileChange: handleFileChange, resetFileName: handleResetFileName, ref: fileUploadButtonRef })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("button", { type: 'submit', className: 'bg-blue-500 text-white px-4 py-2' }, "Save"))),
        react_1["default"].createElement("div", { className: 'mt-8' },
            react_1["default"].createElement(CategoryList_1["default"], { categories: categories, translations: translations, icons: icons, languages: languages, languageId: languageId }))));
};
exports["default"] = AddCategoryPage;
