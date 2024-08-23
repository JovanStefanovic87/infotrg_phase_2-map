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
var FileUploadButton_1 = require("@/app/components/buttons/FileUploadButton");
var CategoryForm = function (_a) {
    var parentId = _a.parentId, setParentId = _a.setParentId, languageId = _a.languageId, name = _a.name, setName = _a.setName, translations = _a.translations, setError = _a.setError, setSuccessMessage = _a.setSuccessMessage, onSubmit = _a.onSubmit, visible = _a.visible;
    var _b = react_1.useState(null), icon = _b[0], setIcon = _b[1];
    var fileUploadButtonRef = react_1.useRef({});
    react_1.useEffect(function () {
        if (!visible) {
            setName('');
            setParentId(null);
            setIcon(null);
            setError('');
            setSuccessMessage(null);
            if (fileUploadButtonRef.current.resetFileName) {
                fileUploadButtonRef.current.resetFileName();
            }
        }
    }, [visible, setName, setParentId, setError, setSuccessMessage]);
    var handleFileChange = function (file) {
        setIcon(file);
    };
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            event.preventDefault();
            onSubmit();
            return [2 /*return*/];
        });
    }); };
    if (!visible)
        return null;
    return (react_1["default"].createElement("form", { onSubmit: handleSubmit, className: 'space-y-4' },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("label", { htmlFor: 'name', className: 'block mb-2' }, "Category Name:"),
            react_1["default"].createElement("input", { type: 'text', id: 'name', value: name, onChange: function (e) { return setName(e.target.value); }, className: 'border p-2 w-full text-black' })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("label", { htmlFor: 'parentId', className: 'block mb-2' }, "Parent Category (optional):"),
            react_1["default"].createElement("select", { id: 'parentId', value: parentId !== null ? parentId : '', onChange: function (e) { return setParentId(e.target.value ? +e.target.value : null); }, className: 'border p-2 w-full text-black' },
                react_1["default"].createElement("option", { value: '' }, "None"),
                translations.map(function (translation) { return (react_1["default"].createElement("option", { key: translation.id, value: translation.id, className: 'text-black' }, translation.translation)); }))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("label", { htmlFor: 'icon', className: 'block mb-2' }, "Icon:"),
            react_1["default"].createElement(FileUploadButton_1["default"], { onFileChange: handleFileChange, resetFileName: fileUploadButtonRef.current.resetFileName, ref: fileUploadButtonRef })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("button", { type: 'submit', className: 'bg-blue-500 text-white px-4 py-2' }, "Save"))));
};
exports["default"] = CategoryForm;
