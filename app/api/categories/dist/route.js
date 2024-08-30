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
exports.POST = exports.GET = void 0;
// api/categories
var server_1 = require("next/server");
var prisma_1 = require("@/app/lib/prisma");
// Function to fetch parent categories
var fetchParents = function (childId) { return __awaiter(void 0, void 0, Promise, function () {
    var parentCategories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.parentCategory.findMany({
                    where: { childId: childId },
                    include: {
                        parent: {
                            include: {
                                icon: true
                            }
                        }
                    }
                })];
            case 1:
                parentCategories = _a.sent();
                return [2 /*return*/, Promise.all(parentCategories.map(function (_a) {
                        var parent = _a.parent;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = {
                                            id: parent.id,
                                            name: '',
                                            iconId: parent.iconId,
                                            labelId: parent.labelId
                                        };
                                        return [4 /*yield*/, fetchParents(parent.id)];
                                    case 1: return [2 /*return*/, (_b.parents = _c.sent(),
                                            _b.children = [],
                                            _b.icon = parent.icon
                                                ? {
                                                    id: parent.icon.id,
                                                    name: parent.icon.name,
                                                    url: parent.icon.url,
                                                    createdAt: parent.icon.createdAt
                                                }
                                                : null,
                                            _b)];
                                }
                            });
                        });
                    }))];
        }
    });
}); };
// Function to build the category tree
var buildCategoryTree = function (parentId) { return __awaiter(void 0, void 0, Promise, function () {
    var categories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.category.findMany({
                    include: {
                        icon: true,
                        childCategories: {
                            include: {
                                child: true
                            }
                        }
                    },
                    where: parentId === null
                        ? { NOT: { childCategories: { some: {} } } }
                        : { childCategories: { some: { parentId: parentId } } }
                })];
            case 1:
                categories = _a.sent();
                // Recursively build the tree structure
                return [2 /*return*/, Promise.all(categories.map(function (category) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = {
                                        id: category.id,
                                        name: '',
                                        iconId: category.iconId,
                                        labelId: category.labelId
                                    };
                                    return [4 /*yield*/, fetchParents(category.id)];
                                case 1:
                                    _a.parents = _b.sent();
                                    return [4 /*yield*/, buildCategoryTree(category.id)];
                                case 2: return [2 /*return*/, (_a.children = _b.sent(),
                                        _a.icon = category.icon
                                            ? {
                                                id: category.icon.id,
                                                name: category.icon.name,
                                                url: category.icon.url,
                                                createdAt: category.icon.createdAt
                                            }
                                            : null,
                                        _a)];
                            }
                        });
                    }); }))];
        }
    });
}); };
function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var topLevelCategories;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, buildCategoryTree(null)];
                case 1:
                    topLevelCategories = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json(topLevelCategories)];
            }
        });
    });
}
exports.GET = GET;
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, parentIds, labelId, iconId, newCategory;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request.json()];
                case 1:
                    _a = _b.sent(), parentIds = _a.parentIds, labelId = _a.labelId, iconId = _a.iconId;
                    return [4 /*yield*/, prisma_1.prisma.category.create({
                            data: {
                                labelId: labelId,
                                iconId: iconId
                            }
                        })];
                case 2:
                    newCategory = _b.sent();
                    if (!(parentIds && parentIds.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma_1.prisma.parentCategory.createMany({
                            data: parentIds.map(function (parentId) { return ({
                                parentId: parentId,
                                childId: newCategory.id
                            }); })
                        })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [2 /*return*/, server_1.NextResponse.json(newCategory)];
            }
        });
    });
}
exports.POST = POST;
