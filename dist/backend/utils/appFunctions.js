"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaginationQuery = exports.hashToken = exports.generateEmailVerificationToken = void 0;
const crypto = require('crypto');
const generateEmailVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};
exports.generateEmailVerificationToken = generateEmailVerificationToken;
const hashToken = (token, userEmail) => {
    const tokenHash = crypto.createHash('sha256').update(token + userEmail).digest('hex');
    return tokenHash;
};
exports.hashToken = hashToken;
const buildPaginationQuery = (query) => {
    try {
        const page = parseInt(query.page) || 1; // Default to page 1
        const limit = parseInt(query.limit) || 10; // Default to 10 users per page
        const skip = (page - 1) * limit;
        return {
            limit,
            skip,
            page
        };
    }
    catch (err) {
        return {
            skip: 0,
            limit: 10,
            page: 1
        };
    }
};
exports.buildPaginationQuery = buildPaginationQuery;
