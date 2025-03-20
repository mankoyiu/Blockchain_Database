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
exports.transferAsset = void 0;
const bigchaindb_driver_1 = require("bigchaindb-driver");
const queryAsset_1 = require("./queryAsset");
const bdb = new bigchaindb_driver_1.Connection('http://192.168.18.128:9984/api/v1/');
const transferAsset = (assetId, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const asset = yield (0, queryAsset_1.queryAsset)(assetId);
        const transferTx = bigchaindb_driver_1.Transaction.makeTransferTransaction([{ tx: asset, output_index: 0 }], [bigchaindb_driver_1.Transaction.makeOutput(bigchaindb_driver_1.Transaction.makeEd25519Condition(to.publicKey))], { transferDate: new Date().toISOString() });
        const signedTx = bigchaindb_driver_1.Transaction.signTransaction(transferTx, from.privateKey);
        const response = yield bdb.postTransactionCommit(signedTx);
        console.log('Transfer Transaction ID:', response.id);
        return response.id;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.transferAsset = transferAsset;
