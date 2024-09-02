"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ImageUploadButton_1 = require("../../components/buttons/ImageUploadButton");
var ChooseImageButton_1 = require("../../components/buttons/ChooseImageButton");
var CustomCombobox_1 = require("@/app/components/input/CustomCombobox");
var SubmitButton_1 = require("@/app/components/buttons/SubmitButton");
var Label_1 = require("../../components/text/Label");
var CategoryForm = function (_a) {
    var name = _a.name, setName = _a.setName, parentIds = _a.parentIds, setParentIds = _a.setParentIds, translations = _a.translations, icons = _a.icons, onFileChange = _a.onFileChange, onFileReset = _a.onFileReset, onSubmit = _a.onSubmit, isIconPickerOpen = _a.isIconPickerOpen, setIsIconPickerOpen = _a.setIsIconPickerOpen;
    // Convert parentIds to selected translations for Combobox
    var selectedParents = translations.filter(function (t) { return parentIds.includes(t.labelId); });
    return (react_1["default"].createElement("form", { onSubmit: onSubmit, className: 'space-y-4' },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Label_1["default"], { htmlFor: 'name' }, "Naziv kategrorije:"),
            react_1["default"].createElement("input", { type: 'text', id: 'name', value: name, onChange: function (e) { return setName(e.target.value); }, className: 'block w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500', placeholder: 'Unesite naziv' })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Label_1["default"], { htmlFor: 'parentId' }, "Naziv natkategorije (opciono):"),
            react_1["default"].createElement(CustomCombobox_1["default"], { options: translations, selectedOptions: selectedParents, onSelect: function (newSelectedOptions) {
                    var newParentIds = newSelectedOptions.map(function (option) { return option.labelId; });
                    setParentIds(newParentIds);
                }, placeholder: 'Izaberite natkategoriju' })),
        react_1["default"].createElement("div", { className: 'flex w-full space-x-4' },
            react_1["default"].createElement(ImageUploadButton_1["default"], { id: 'iconUpload', label: 'Nova ikonica (PNG)', onChange: function (e) { return onFileChange(e.target.files ? e.target.files[0] : null); } }),
            react_1["default"].createElement(ChooseImageButton_1["default"], { onClick: function () { return setIsIconPickerOpen(true); }, label: 'Izbor ikonice' // Custom label
             })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(SubmitButton_1["default"], null, "Sa\u010Duvaj"))));
};
exports["default"] = CategoryForm;
