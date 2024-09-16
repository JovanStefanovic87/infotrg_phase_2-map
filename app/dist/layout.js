"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Main_1 = require("./components/layout/Main");
var Header_1 = require("./components/layout/Header");
var Sidebar_1 = require("./components/layout/Sidebar");
var Footer_1 = require("./components/layout/Footer");
var Breadcrumb_1 = require("./components/layout/Breadcrumb");
var SidebarContext_1 = require("./context/SidebarContext");
var provider_1 = require("./globalRedux/provider");
require("@/app/globals.css");
var useScrollRestoration_1 = require("../utils/helpers/useScrollRestoration");
var ClientSessionProvider_1 = require("./ClientSessionProvider");
var Layout = function (_a) {
    var children = _a.children;
    return (react_1["default"].createElement("html", { lang: 'en' },
        react_1["default"].createElement("head", null),
        react_1["default"].createElement("body", { className: 'flex flex-col min-h-screen bg-blueMain' },
            react_1["default"].createElement(ClientSessionProvider_1["default"], null,
                react_1["default"].createElement(SidebarContext_1.SidebarProvider, null,
                    react_1["default"].createElement("div", { className: 'flex flex-1' },
                        react_1["default"].createElement(Sidebar_1["default"], null),
                        react_1["default"].createElement("div", { className: 'flex-1 flex flex-col' },
                            react_1["default"].createElement(provider_1.Providers, null,
                                react_1["default"].createElement(Header_1["default"], null),
                                react_1["default"].createElement(Main_1["default"], null,
                                    react_1["default"].createElement(Breadcrumb_1["default"], null),
                                    children)))),
                    react_1["default"].createElement(Footer_1["default"], null)),
                react_1["default"].createElement(useScrollRestoration_1["default"], null)))));
};
exports["default"] = Layout;
