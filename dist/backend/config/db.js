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
const mongoose = require("mongoose");
const connetDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('MangoDB connecting....');
    try {
        (_a = mongoose === null || mongoose === void 0 ? void 0 : mongoose.connection) === null || _a === void 0 ? void 0 : _a.close();
        const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }, family: 4, };
        yield mongoose.connect(`${process.env.MONGO_URL}${process.env.DATABASE}`, clientOptions);
    }
    catch (err) {
        throw Error('MangoDB Connection issue');
    }
});
// Listen to connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
mongoose.connection.on('error', (err) => {
    console.log('Error in MongoDB connection:', err);
});
module.exports = connetDataBase;
