import { assetData, createAsset } from "./art";
import { autoCreateSampleUsers } from "./users";
import { transferAsset } from './transfer';
import { queryAsset } from "./queryart";

const users = autoCreateSampleUsers();
const assets = assetData(); // No need to pass users here as assetData doesn't require it

const main = async () => {
    try {
        // 1. User 1 owned item 1: 1 > 3 > 4 
        const createAsset1 = await createAsset(users[0]);
        if (!createAsset1 || createAsset1.length === 0) {
            throw new Error("Failed to create the first asset.");
        }
        console.log('1st item created:', createAsset1);

        const transferAsset1_1to3 = await transferAsset(createAsset1[0], users[0], users[2]);
        console.log('1st item transfer from 1 to 3:', transferAsset1_1to3);

        const transferAsset1_3to4 = await transferAsset(transferAsset1_1to3, users[2], users[3]);
        console.log('1st item transfer from 3 to 4:', transferAsset1_3to4);
        
        // 2. User 2 owned item 2: 2 > 3 > 5 
        const createAsset2 = await createAsset(users[1]);
        if (!createAsset2 || createAsset2.length === 0) {
            throw new Error("Failed to create the second asset.");
        }
        console.log('2nd item created:', createAsset2);

        const transferAsset2_2to3 = await transferAsset(createAsset2[0], users[1], users[2]);
        console.log('2nd item transfer from 2 to 3:', transferAsset2_2to3);

        const transferAsset2_3to5 = await transferAsset(transferAsset2_2to3, users[2], users[4]);
        console.log('2nd item transfer from 3 to 5:', transferAsset2_3to5);

        // 3. User 3 owned item 3: 3 > 1 > 2 
        const createAsset3 = await createAsset(users[2]);
        if (!createAsset3 || createAsset3.length === 0) {
            throw new Error("Failed to create the third asset.");
        }
        console.log('3rd item created:', createAsset3);

        const transferAsset3_3to1 = await transferAsset(createAsset3[0], users[2], users[0]);
        console.log('3rd item transfer from 3 to 1:', transferAsset3_3to1);

        const transferAsset3_1to2 = await transferAsset(transferAsset3_3to1, users[0], users[1]);
        console.log('3rd item transfer from 1 to 2:', transferAsset3_1to2);

        // 4. User 4 owned item 4: 4 > 2 > 5 
        const createAsset4 = await createAsset(users[3]);
        if (!createAsset4 || createAsset4.length === 0) {
            throw new Error("Failed to create the fourth asset.");
        }
        console.log('4th item created:', createAsset4);

        const transferAsset4_4to2 = await transferAsset(createAsset4[0], users[3], users[1]);
        console.log('4th item transfer from 4 to 2:', transferAsset4_4to2);

        const transferAsset4_2to5 = await transferAsset(transferAsset4_4to2, users[1], users[4]);
        console.log('4th item transfer from 2 to 5:', transferAsset4_2to5);

        // 5. User 5 owned item 5: 5 > 3 > 1 
        const createAsset5 = await createAsset(users[4]);
        if (!createAsset5 || createAsset5.length === 0) {
            throw new Error("Failed to create the fifth asset.");
        }
        console.log('5th item created:', createAsset5);

        const transferAsset5_5to3 = await transferAsset(createAsset5[0], users[4], users[2]);
        console.log('5th item transfer from 5 to 3:', transferAsset5_5to3);

        const transferAsset5_3to1 = await transferAsset(transferAsset5_5to3, users[2], users[0]);
        console.log('5th item transfer from 3 to 1:', transferAsset5_3to1);

    } catch (error: any) {
        console.error("An error occurred:", error.message);
    }
}

// Run the main function
main();