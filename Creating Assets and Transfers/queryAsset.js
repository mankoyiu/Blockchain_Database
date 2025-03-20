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
const bigchaindb_driver_1 = require("bigchaindb-driver");
const bdb = new bigchaindb_driver_1.Connection('http://192.168.18.128:9984/api/v1/');
const queryAsset = (assetId) => __awaiter(void 0, void 0, void 0, function* () {
    const asset = yield bdb.getTransaction(assetId);
    if (!asset) {
        throw new Error('Asset not found');
    }
    return asset;
});
exports.queryAsset = queryAsset;
const queryOwnerHistory = (assetId) => __awaiter(void 0, void 0, void 0, function* () {
    const history = yield bdb.listTransactions(assetId);
    if (!history) {
        throw new Error('History not found');
    }
    return history;
});
exports.queryOwnerHistory = queryOwnerHistory;
