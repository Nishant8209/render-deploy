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
exports.getUserById = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUsers = void 0;
const userService_1 = require("../services/userService");
const response_1 = require("../utils/response");
const StatusCodes_1 = require("../utils/StatusCodes");
const constants_1 = require("../utils/constants");
// GET all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsersService)(req.query);
        (0, response_1.successResponse)(res, users, '', StatusCodes_1.StatusCode.OK);
    }
    catch (error) {
        (0, response_1.failResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || error, StatusCodes_1.StatusCode.Bad_Request);
    }
});
exports.getUsers = getUsers;
// POST create new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, userService_1.createUserService)(Object.assign(Object.assign({}, req.body), { createdBy: null, updatedBy: null }));
        if ((newUser === null || newUser === void 0 ? void 0 : newUser.message) === constants_1.Messages.Duplicate_Email || !(newUser === null || newUser === void 0 ? void 0 : newUser.email)) {
            (0, response_1.failResponse)(res, newUser === null || newUser === void 0 ? void 0 : newUser.message, StatusCodes_1.StatusCode.Bad_Request);
            return;
        }
        (0, response_1.successResponse)(res, newUser, constants_1.Messages.User_Created, StatusCodes_1.StatusCode.Created);
    }
    catch (error) {
        (0, response_1.failResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || error, StatusCodes_1.StatusCode.Bad_Request);
    }
});
exports.createUser = createUser;
// Delete delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newUser = yield (0, userService_1.deleteUserService)(id);
        if (newUser === null || newUser === void 0 ? void 0 : newUser.message) {
            (0, response_1.failResponse)(res, newUser === null || newUser === void 0 ? void 0 : newUser.message, StatusCodes_1.StatusCode.Bad_Request);
            return;
        }
        (0, response_1.successResponse)(res, { email: newUser === null || newUser === void 0 ? void 0 : newUser.email }, constants_1.Messages.User_Deleted, StatusCodes_1.StatusCode.OK);
    }
    catch (error) {
        (0, response_1.failResponse)(res, (error === null || error === void 0 ? void 0 : error.message) || error, StatusCodes_1.StatusCode.Bad_Request);
    }
});
exports.deleteUser = deleteUser;
// Put update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedUser = yield (0, userService_1.updateUserService)(id, req.body);
        if (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.message) {
            (0, response_1.failResponse)(res, updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.message, StatusCodes_1.StatusCode.Bad_Request);
            return;
        }
        (0, response_1.successResponse)(res, updatedUser, constants_1.Messages.User_Updated, StatusCodes_1.StatusCode.OK);
    }
    catch (err) {
        console.log('err', err);
        (0, response_1.failResponse)(res, (err === null || err === void 0 ? void 0 : err.message) || err, StatusCodes_1.StatusCode.Bad_Request);
    }
});
exports.updateUser = updateUser;
// Get user By Id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (0, userService_1.getUserByIdService)(id);
        if (user === null || user === void 0 ? void 0 : user.message) {
            (0, response_1.failResponse)(res, user === null || user === void 0 ? void 0 : user.message, StatusCodes_1.StatusCode.Bad_Request);
            return;
        }
        (0, response_1.successResponse)(res, user, constants_1.Messages.User_Updated, StatusCodes_1.StatusCode.OK);
    }
    catch (err) {
        console.log('err', err);
        (0, response_1.failResponse)(res, (err === null || err === void 0 ? void 0 : err.message) || err, StatusCodes_1.StatusCode.Bad_Request);
    }
});
exports.getUserById = getUserById;
