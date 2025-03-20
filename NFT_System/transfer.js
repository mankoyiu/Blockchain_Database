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
const queryart_1 = require("./queryart");
const connection_1 = require("./utils/connection");
const transferAsset = (assetId, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query the asset using its ID
        const asset = yield (0, queryart_1.queryAsset)(assetId);
        // Create a transfer transaction
        const transferTx = bigchaindb_driver_1.Transaction.makeTransferTransaction([{ tx: asset, output_index: 0 }], [bigchaindb_driver_1.Transaction.makeOutput(bigchaindb_driver_1.Transaction.makeEd25519Condition(to.key.publicKey))], { transferDate: new Date().toISOString() });
        // Sign the transaction with the private key of the current owner
        const signedTx = bigchaindb_driver_1.Transaction.signTransaction(transferTx, from.key.privateKey);
        // Commit the transaction to BigchainDB
        const response = yield connection_1.bdb.postTransactionCommit(signedTx);
        return response.id; // Return the ID of the transfer transaction
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.transferAsset = transferAsset;
