import { Connection } from 'bigchaindb-driver';
const bdb = new Connection('http://192.168.18.128:9984/api/v1/');
export const queryAsset = async (assetId: string) => {
const asset = await bdb.getTransaction(assetId);
if (!asset) {
throw new Error('Asset not found');
}
return asset;
}
export const queryOwnerHistory = async (assetId: string) => {
    const history = await bdb.listTransactions(assetId);
    if (!history) {
    throw new Error('History not found');
    }
    return history;
    
    }

