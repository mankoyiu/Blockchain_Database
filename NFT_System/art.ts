import { Ed25519Keypair, Transaction } from "bigchaindb-driver";
import { assetMetadata } from "./utils/metadata";
import { bdb } from "./utils/connection";  

export const assetData = () => {
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
}

// Create assets function
export const createAsset = async (creator: any) => {
    try {
        const assets = assetData();
        console.log("Assets to create:", assets);

        const createdAssets = []; 

        for (const asset of assets) {
            const metadata = assetMetadata(creator);
            const assetData = {
                asset_name: asset.asset_name,
                description: asset.description,
                creator: asset.creator,
                type: asset.type,
                filesize: asset.filesize,
                resolution: asset.resolution
            };

            const preparedTx = Transaction.makeCreateTransaction(
                assetData,
                metadata,
                [Transaction.makeOutput(Transaction.makeEd25519Condition(creator.key.publicKey))],
                creator.key.publicKey
            );

            const signedTx = Transaction.signTransaction(preparedTx, creator.key.privateKey);
            const response = await bdb.postTransactionCommit(signedTx);
            
            
            createdAssets.push(response);
        }

        
        console.log("Assets created:", createdAssets);

        return createdAssets.map(asset => asset.id); 
    } catch (error) {
        console.error("Error creating assets:", error);
    }
}