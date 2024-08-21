'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var FileUploadButton = react_1.forwardRef(function (_a, ref) {
    var onFileChange = _a.onFileChange, resetFileName = _a.resetFileName;
    var _b = react_1.useState(null), fileName = _b[0], setFileName = _b[1];
    var handleFileChange = function (event) {
        var file = event.target.files ? event.target.files[0] : null;
        setFileName(file ? file.name : null);
        onFileChange(file);
    };
    react_1.useImperativeHandle(ref, function () { return ({
        resetFileName: function () {
            setFileName(null);
        }
    }); });
    return (react_1["default"].createElement("div", { style: { display: 'inline-block' } },
        react_1["default"].createElement("label", { htmlFor: 'file-upload', style: {
                display: 'inline-block',
                padding: '8px 16px',
                border: '1px solid #ccc',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '14px'
            } }, fileName || 'Choose an icon'),
        react_1["default"].createElement("input", { type: 'file', id: 'file-upload', onChange: handleFileChange, style: { display: 'none' } })));
});
FileUploadButton.displayName = 'FileUploadButton';
exports["default"] = FileUploadButton;
