"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoCreateSampleUsers = void 0;
const bigchaindb_driver_1 = require("bigchaindb-driver");
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
const users = [];
const autoCreateSampleUsers = () => {
    for (const userData of usersData) {
        const user = {
            username: userData.username,
            name: userData.name,
            email: userData.email,
            key: new bigchaindb_driver_1.Ed25519Keypair()
        };
        users.push(user);
    }
    return userList();
};
exports.autoCreateSampleUsers = autoCreateSampleUsers;
const userList = () => {
    return users;
};
