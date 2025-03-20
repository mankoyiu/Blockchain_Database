import { Transaction } from "bigchaindb-driver";
import { queryAsset } from "./queryart";
import { bdb } from "./utils/connection";

export const transferAsset = async (assetId: string, from: any, to: any) => {
    try {
        // Query the asset using its ID
        const asset = await queryAsset(assetId);
        
        // Create a transfer transaction
        const transferTx = Transaction.makeTransferTransaction(
            [{ tx: asset, output_index: 0 }],
            [Transaction.makeOutput(Transaction.makeEd25519Condition(to.key.publicKey))],
            { transferDate: new Date().toISOString() }
        );

        // Sign the transaction with the private key of the current owner
        const signedTx = Transaction.signTransaction(transferTx, from.key.privateKey);

        // Commit the transaction to BigchainDB
        const response = await bdb.postTransactionCommit(signedTx);

        return response.id;  // Return the ID of the transfer transaction
    } catch (error: any) {
        throw new Error(error.message);
    }
}