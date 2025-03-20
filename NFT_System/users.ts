import { Ed25519Keypair } from "bigchaindb-driver";

const usersData = [
    {
        username: "alice_johnson",
        name: "Alice JOHNSON",
        email: "alice.johnson@lonemail.com"
    },
    {
        username: "lukeseven123",
        name: "Luke WONG",
        email: "luke123@imail.com"
    },
    {
        username: "heyman666",
        name: "Hayson MAN",
        email: "man666@dudumail.com"
    },
    {
        username: "mingchen222",
        name: "Ming LIN",
        email: "popming@movaction.hk"
    },
    {
        username: "coco743",
        name: "Coco GO",
        email: "gogogogogo@coconut.com"
    }
];

const users: Array<{ username: string; name: string; email: string; key: Ed25519Keypair }> = [];

export const autoCreateSampleUsers = () => {
    for (const userData of usersData) {
        const user = {
            username: userData.username, 
            name: userData.name,         
            email: userData.email,       
            key: new Ed25519Keypair()    
        };

        users.push(user);
    }

    return userList();
}

const userList = () => {
    return users;
}