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
exports.createAsset = void 0;
const bigchaindb_driver_1 = require("bigchaindb-driver");
// Connect to a BigchainDB node
const bdb = new bigchaindb_driver_1.Connection('http://192.168.18.128:9984/api/v1/');
const createAsset = (creator, assetData) => __awaiter(void 0, void 0, void 0, function* () {
    const metadata = {
        creator: creator.publicKey,
        created_at: new Date().toISOString()
    };
    const preparedTx = bigchaindb_driver_1.Transaction.makeCreateTransaction(assetData, metadata, [bigchaindb_driver_1.Transaction.makeOutput(bigchaindb_driver_1.Transaction.makeEd25519Condition(creator.publicKey))], creator.publicKey);
    const signedTx = bigchaindb_driver_1.Transaction.signTransaction(preparedTx, creator.privateKey);
    const response = yield bdb.postTransactionCommit(signedTx);
    return response.id;
});
exports.createAsset = createAsset;
