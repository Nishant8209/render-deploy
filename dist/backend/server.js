"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // Load environment variables from .env
const app = require('./app');
const http = require('http');
const connetDataBase = require('./config/db');
const mongoose = require("mongoose");
const server = http.createServer(app);
// Start server on the specified port
const PORT = process.env.PORT || 5000;
// Connect Mongodb
connetDataBase().then((res) => {
    console.log('res', res);
    // Create HTTP server
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log('err', err);
    process.exit(1);
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield ((_a = mongoose === null || mongoose === void 0 ? void 0 : mongoose.connection) === null || _a === void 0 ? void 0 : _a.close());
        console.log('MongoDB connection closed');
        process.exit(0); // Exit process
    }
    catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
}));
