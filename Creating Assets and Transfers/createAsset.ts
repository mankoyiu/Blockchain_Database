import { Connection, Ed25519Keypair, Transaction } from 'bigchaindb-driver';
// Connect to a BigchainDB node
const bdb = new Connection('http://192.168.18.128:9984/api/v1/');
export const createAsset = async (creator: Ed25519Keypair, assetData: any) => {
const metadata = {
creator: creator.publicKey,
created_at: new Date().toISOString()
};
const preparedTx = Transaction.makeCreateTransaction(
assetData,
metadata,
[Transaction.makeOutput(Transaction.makeEd25519Condition(creator.publicKey))],
creator.publicKey
);
const signedTx = Transaction.signTransaction(preparedTx, creator.privateKey);
const response = await bdb.postTransactionCommit(signedTx);
return response.id;
}
