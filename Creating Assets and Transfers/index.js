"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const createAsset_1 = require("./createAsset");
const transferAsset_1 = require("./transferAsset");
const queryAsset_1 = require("./queryAsset");
const bigchaindb_driver_1 = require("bigchaindb-driver");
const crypto = __importStar(require("crypto"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create an array to hold user data
    const users = [
        {
            username: 'user1',
            name: 'A',
            keypair: new bigchaindb_driver_1.Ed25519Keypair()
        },
        {
            username: 'user2',
            name: 'B',
            keypair: new bigchaindb_driver_1.Ed25519Keypair()
        },
        {
            username: 'user3',
            name: 'C',
            keypair: new bigchaindb_driver_1.Ed25519Keypair()
        },
        {
            username: 'user4',
            name: 'D',
            keypair: new bigchaindb_driver_1.Ed25519Keypair()
        },
        {
            username: 'user5',
            name: 'E',
            keypair: new bigchaindb_driver_1.Ed25519Keypair()
        }
    ];
    // Log the public and private keys for each user
    users.forEach(user => {
        console.log(`Username: ${user.username}`);
        console.log(`Name: ${user.name}`);
        console.log(`Public Key: ${user.keypair.publicKey}`);
        console.log(`Private Key: ${user.keypair.privateKey}`);
        console.log('---------------------------');
    });
    const nftAssetsData = [
        {
            assetType: 'Art',
            title: 'Digital Artwork',
            description: 'A unique piece of digital art',
            creator: { name: users[0].name },
            creationDate: new Date().toISOString(),
            uniqueID: crypto.randomUUID()
        },
        {
            assetType: 'Music',
            title: 'Music Track',
            description: 'A new music track',
            creator: { name: users[1].name },
            creationDate: new Date().toISOString(),
            uniqueID: crypto.randomUUID()
        },
        {
            assetType: 'Document',
            title: 'Research Paper',
            description: 'A groundbreaking research paper',
            creator: { name: users[2].name },
            creationDate: new Date().toISOString(),
            uniqueID: crypto.randomUUID()
        },
        {
            assetType: 'Software',
            title: 'Software License',
            description: 'A license for a software product',
            creator: { name: users[3].name },
            creationDate: new Date().toISOString(),
            uniqueID: crypto.randomUUID()
        },
        {
            assetType: 'Photo',
            title: 'Photograph',
            description: 'A high-resolution photograph',
            creator: { name: users[4].name },
            creationDate: new Date().toISOString(),
            uniqueID: crypto.randomUUID()
        }
    ];
    const assetIds = []; // Array to hold created asset IDs
    try {
        // Step 1: Create the assets
        for (let i = 0; i < nftAssetsData.length; i++) {
            const nftAssetData = nftAssetsData[i];
            const creatorKeypair = users[i].keypair; // Assign the user's keypair
            // Create the asset
            const assetId = yield (0, createAsset_1.createAsset)(creatorKeypair, nftAssetData);
            console.log(`Asset created with ID: ${assetId}`);
            console.log(JSON.stringify(yield (0, queryAsset_1.queryAsset)(assetId), null, 2));
            assetIds.push(assetId); // Store the asset ID for the transfer step
        }
        for (let i = 0; i < assetIds.length; i++) {
            const assetId = assetIds[i];
            let currentOwnerIndex = i;
            for (let j = 0; j < 4; j++) {
                const creatorKeypair = users[currentOwnerIndex].keypair; // Get the current owner's keypair
                const newOwnerIndex = (currentOwnerIndex + 1) % users.length;
                const newOwnerKeypair = users[newOwnerIndex].keypair; // Get the next user's keypair
                // Transfer the asset
                yield (0, transferAsset_1.transferAsset)(assetId, creatorKeypair, newOwnerKeypair);
                console.log('Asset transferred successfully');
                console.log(JSON.stringify(yield (0, queryAsset_1.queryOwnerHistory)(assetId), null, 2));
                currentOwnerIndex = newOwnerIndex; // Update the current owner index
            }
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
});
main();
