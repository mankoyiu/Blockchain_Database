"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bdb = void 0;
const bigchaindb_driver_1 = require("bigchaindb-driver");
exports.bdb = new bigchaindb_driver_1.Connection('http://192.168.18.128:9984/api/v1/');
