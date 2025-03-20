import { Connection, Ed25519Keypair, Transaction } from 'bigchaindb-driver';
import { queryAsset } from './queryAsset';
const bdb = new Connection('http://192.168.18.128:9984/api/v1/');
export const transferAsset = async (assetId: string, from: Ed25519Keypair, to: Ed25519Keypair) => {
try{
const asset = await queryAsset(assetId);
const transferTx = Transaction.makeTransferTransaction(
[{tx: asset, output_index: 0 }],
[Transaction.makeOutput(Transaction.makeEd25519Condition(to.publicKey))],
{ transferDate: new Date().toISOString() }
);
const signedTx = Transaction.signTransaction(transferTx, from.privateKey);
const response = await bdb.postTransactionCommit(signedTx);
console.log('Transfer Transaction ID:', response.id);
return response.id;
} catch (error: any) {
throw new Error(error.message);
}
}
