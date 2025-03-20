import { bdb } from "./utils/connection";

// Function to query an asset by its ID
export const queryAsset = async (assetId: string) => {
    const asset = await bdb.getTransaction(assetId);
    if (!asset) {
        throw new Error('Asset not found');
    }
    return asset;
}

// Function to query the history of ownership of an asset
export const queryOwnerHistory = async (assetId: string) => {
    const history = await bdb.listTransactions(assetId);
    if (!history) {
        throw new Error('History not found');
    }
    return history;
}