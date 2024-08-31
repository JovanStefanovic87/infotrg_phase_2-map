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
exports.DELETE = exports.POST = void 0;
// app/api/synonyms/route.ts
var server_1 = require("next/server");
var prisma_1 = require("../../lib/prisma");
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var body, translationId_1, synonyms, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    body = _a.sent();
                    translationId_1 = body.translationId, synonyms = body.synonyms;
                    console.log('synonyms', synonyms);
                    if (!translationId_1 || !Array.isArray(synonyms)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Invalid input data' }, { status: 400 })];
                    }
                    // Delete existing synonyms for the translation
                    return [4 /*yield*/, prisma_1.prisma.synonym.deleteMany({
                            where: { translationId: translationId_1 }
                        })];
                case 2:
                    // Delete existing synonyms for the translation
                    _a.sent();
                    if (!(synonyms.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma_1.prisma.synonym.createMany({
                            data: synonyms.map(function (synonym) { return ({
                                translationId: translationId_1,
                                synonym: synonym
                            }); })
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, server_1.NextResponse.json({ message: 'Synonyms updated successfully' })];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error updating synonyms:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json({ error: 'Error updating synonyms' }, { status: 500 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, translationId, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    searchParams = new URL(request.url).searchParams;
                    translationId = searchParams.get('translationId');
                    if (!translationId) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Translation ID is required' }, { status: 400 })];
                    }
                    // Delete all synonyms for the given translation
                    return [4 /*yield*/, prisma_1.prisma.synonym.deleteMany({
                            where: { translationId: Number(translationId) }
                        })];
                case 1:
                    // Delete all synonyms for the given translation
                    _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: 'Synonyms deleted successfully' })];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error deleting synonyms:', error_2);
                    return [2 /*return*/, server_1.NextResponse.json({ error: 'Error deleting synonyms' }, { status: 500 })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.DELETE = DELETE;
