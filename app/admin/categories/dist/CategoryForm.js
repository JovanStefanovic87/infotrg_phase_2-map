"use strict";
exports.__esModule = true;
// CategoryForm.tsx
var react_1 = require("react");
var FileUploadButton_1 = require("@/app/components/buttons/FileUploadButton");
var CustomCombobox_1 = require("@/app/components/input/CustomCombobox");
var CategoryForm = function (_a) {
    var name = _a.name, setName = _a.setName, parentIds = _a.parentIds, setParentIds = _a.setParentIds, translations = _a.translations, icons = _a.icons, onFileChange = _a.onFileChange, onFileReset = _a.onFileReset, onSubmit = _a.onSubmit, isIconPickerOpen = _a.isIconPickerOpen, setIsIconPickerOpen = _a.setIsIconPickerOpen;
    // Convert parentIds to selected translations for Combobox
    var selectedParents = translations.filter(function (t) { return parentIds.includes(t.labelId); });
    return (react_1["default"].createElement("form", { onSubmit: onSubmit, className: 'space-y-4' },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("label", { htmlFor: 'name', className: 'block mb-2' }, "Naziv kategrorije:"),
            react_1["default"].createElement("input", { type: 'text', id: 'name', value: name, onChange: function (e) { return setName(e.target.value); }, className: 'border p-2 w-full text-black', placeholder: 'Unesite naziv' })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("label", { htmlFor: 'parentId', className: 'block mb-2' }, "Naziv natkategorije (opciono):"),
            react_1["default"].createElement(CustomCombobox_1["default"], { options: translations, selectedOptions: selectedParents, onSelect: function (newSelectedOptions) {
                    var newParentIds = newSelectedOptions.map(function (option) { return option.labelId; });
                    setParentIds(newParentIds);
                }, placeholder: 'Izaberite natkategoriju' })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("label", { htmlFor: 'icon', className: 'block mb-2' }, "Icon:"),
            react_1["default"].createElement(FileUploadButton_1["default"], { onFileChange: onFileChange, resetFileName: onFileReset }),
            react_1["default"].createElement("button", { type: 'button', className: 'text-blue-500 mt-2', onClick: function () {
                    setIsIconPickerOpen(true);
                    icons;
                } }, "Choose from existing icons")),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("button", { type: 'submit', className: 'bg-blue-500 text-white px-4 py-2' }, "Save"))));
};
exports["default"] = CategoryForm;
