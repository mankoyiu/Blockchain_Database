import { createAsset } from './createAsset';
import { transferAsset } from './transferAsset';
import { queryAsset, queryOwnerHistory } from './queryAsset';
import { Ed25519Keypair } from 'bigchaindb-driver';
import * as crypto from 'crypto';

const main = async () => {
    // Create an array to hold user data
    const users = [
        {
            username: 'user1',
            name: 'A',
            keypair: new Ed25519Keypair()
        },
        {
            username: 'user2',
            name: 'B',
            keypair: new Ed25519Keypair()
        },
        {
            username: 'user3',
            name: 'C',
            keypair: new Ed25519Keypair()
        },
        {
            username: 'user4',
            name: 'D',
            keypair: new Ed25519Keypair()
        },
        {
            username: 'user5',
            name: 'E',
            keypair: new Ed25519Keypair()
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

    const assetIds: string[] = []; // Array to hold created asset IDs

    try {
        // Step 1: Create the assets
        for (let i = 0; i < nftAssetsData.length; i++) {
            const nftAssetData = nftAssetsData[i];
            const creatorKeypair = users[i].keypair; // Assign the user's keypair

            // Create the asset
            const assetId = await createAsset(creatorKeypair, nftAssetData);
            console.log(`Asset created with ID: ${assetId}`);
            console.log(JSON.stringify(await queryAsset(assetId), null, 2));

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
                await transferAsset(assetId, creatorKeypair, newOwnerKeypair);
                console.log('Asset transferred successfully');
                console.log(JSON.stringify(await queryOwnerHistory(assetId), null, 2));
        
                currentOwnerIndex = newOwnerIndex; // Update the current owner index
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

main();