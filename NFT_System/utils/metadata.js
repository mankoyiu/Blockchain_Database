"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetMetadata = void 0;
const assetMetadata = (user) => {
    const metadata = {
        creator: user.key.publicKey,
        create_at: new Date().toISOString()
    };
    return metadata;
};
exports.assetMetadata = assetMetadata;
