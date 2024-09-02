"use strict";
exports.__esModule = true;
var TextSpecifications = function (_a) {
    var label = _a.label, value = _a.value;
    if (!value) {
        return null;
    }
    return (React.createElement("div", { className: 'flex gap-0 lg:gap-4 justify-start items-center lg:items-start border-b-2 border-gray-200 py-1' },
        React.createElement("p", { className: 'text-left text-black font-bold text-xs sm:text-sm md:text-base lg:text-lg w-36 flex-1 lg:w-60' }, label),
        React.createElement("p", { className: 'text-left text-black font-normal text-xs sm:text-sm md:text-base lg:text-lg flex-1' }, value)));
};
exports["default"] = TextSpecifications;
