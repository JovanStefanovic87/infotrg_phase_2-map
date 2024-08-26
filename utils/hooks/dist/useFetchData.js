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
exports.fetchTranslations = exports.fetchIcons = exports.fetchLanguages = exports.fetchCategories = void 0;
var axios_1 = require("axios");
// Fetch categories with optional id
exports.fetchCategories = function (id) { return __awaiter(void 0, void 0, Promise, function () {
    var url, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                url = id ? "/api/categories/" + id : '/api/categories';
                return [4 /*yield*/, axios_1["default"].get(url)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_1 = _a.sent();
                console.error('Error fetching categories:', error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
// Fetch languages
exports.fetchLanguages = function () { return __awaiter(void 0, void 0, Promise, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get('/api/languages')];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_2 = _a.sent();
                console.error('Failed to fetch languages:', error_2);
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
// Fetch icons
exports.fetchIcons = function () { return __awaiter(void 0, void 0, Promise, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].get('/api/icons')];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_3 = _a.sent();
                console.error('Failed to fetch icons:', error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
// Fetch translations based on languageId
exports.fetchTranslations = function (languageId) { return __awaiter(void 0, void 0, Promise, function () {
    var labelsResponse, labels, translationsPromises, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].get('/api/labels', { params: { languageId: languageId } })];
            case 1:
                labelsResponse = _a.sent();
                labels = Array.isArray(labelsResponse.data) ? labelsResponse.data : [];
                translationsPromises = labels.map(function (label) { return __awaiter(void 0, void 0, void 0, function () {
                    var translationResponse;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, axios_1["default"].get('/api/translation', {
                                    params: { languageId: languageId, labelId: label.id }
                                })];
                            case 1:
                                translationResponse = _a.sent();
                                return [2 /*return*/, translationResponse.data];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(translationsPromises)];
            case 2: return [2 /*return*/, (_a.sent()).flat()];
            case 3:
                error_4 = _a.sent();
                console.error('Failed to fetch translations:', error_4);
                throw error_4;
            case 4: return [2 /*return*/];
        }
    });
}); };
