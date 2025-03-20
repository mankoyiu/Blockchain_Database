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
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOwnerHistory = exports.queryAsset = void 0;
const connection_1 = require("./utils/connection");
// Function to query an asset by its ID
const queryAsset = (assetId) => __awaiter(void 0, void 0, void 0, function* () {
    const asset = yield connection_1.bdb.getTransaction(assetId);
    if (!asset) {
        throw new Error('Asset not found');
    }
    return asset;
});
exports.queryAsset = queryAsset;
// Function to query the history of ownership of an asset
const queryOwnerHistory = (assetId) => __awaiter(void 0, void 0, void 0, function* () {
    const history = yield connection_1.bdb.listTransactions(assetId);
    if (!history) {
        throw new Error('History not found');
    }
    return history;
});
exports.queryOwnerHistory = queryOwnerHistory;
