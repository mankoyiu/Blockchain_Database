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
exports.createAsset = exports.assetData = void 0;
const bigchaindb_driver_1 = require("bigchaindb-driver");
const metadata_1 = require("./utils/metadata");
const connection_1 = require("./utils/connection");
const assetData = () => {
    return [
        {
            asset_name: 'Mona Lisa',
            description: 'A portrait by Leonardo da Vinci',
            creator: 'mingchen222',
            type: 'JPG',
            filesize: '4.5Mb',
            resolution: '1920x1080'
        },
        {
            asset_name: 'Starry Night',
            description: 'A painting by Vincent van Gogh.',
            creator: 'heyman666',
            type: 'PNG',
            filesize: '5.1Mb',
            resolution: '2048x1536'
        },
        {
            asset_name: 'Artistic-realistic nature',
            description: 'F32, Toronto. 20k photos of nature. 100% art, realistic, vertical, large, untouched, fully credited, carefully selected and heartily loved.',
            creator: 'alice_johnson',
            type: 'RAW',
            filesize: '50.2Mb',
            resolution: '2048x1536'
        },
        {
            asset_name: 'Lizzy Stewart',
            description: 'City Drawing',
            creator: 'coco743',
            type: 'RAW',
            filesize: '50.2Mb',
            resolution: '2048x1536'
        },
        {
            asset_name: 'Sheep Paintings',
            description: 'Folk art. Love this, some friends had a quilt made for with this as part of it :)',
            creator: 'mingchen222',
            type: 'JPG',
            filesize: '5.9Mb',
            resolution: '1920x1080'
        }
    ];
};
exports.assetData = assetData;
// Create assets function
const createAsset = (creator) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assets = (0, exports.assetData)();
        console.log("Assets to create:", assets);
        const createdAssets = [];
        for (const asset of assets) {
            const metadata = (0, metadata_1.assetMetadata)(creator);
            const assetData = {
                asset_name: asset.asset_name,
                description: asset.description,
                creator: asset.creator,
                type: asset.type,
                filesize: asset.filesize,
                resolution: asset.resolution
            };
            const preparedTx = bigchaindb_driver_1.Transaction.makeCreateTransaction(assetData, metadata, [bigchaindb_driver_1.Transaction.makeOutput(bigchaindb_driver_1.Transaction.makeEd25519Condition(creator.key.publicKey))], creator.key.publicKey);
            const signedTx = bigchaindb_driver_1.Transaction.signTransaction(preparedTx, creator.key.privateKey);
            const response = yield connection_1.bdb.postTransactionCommit(signedTx);
            createdAssets.push(response);
        }
        console.log("Assets created:", createdAssets);
        return createdAssets.map(asset => asset.id);
    }
    catch (error) {
        console.error("Error creating assets:", error);
    }
});
exports.createAsset = createAsset;
