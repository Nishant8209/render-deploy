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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdService = exports.updateUserService = exports.deleteUserService = exports.createUserService = exports.getAllUsersService = void 0;
const User_1 = __importDefault(require("../models/User"));
const constants_1 = require("../utils/constants");
const appFunctions_1 = require("../utils/appFunctions");
const getAllUsersService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, page } = (0, appFunctions_1.buildPaginationQuery)(query);
        const { userType, status, search } = query;
        let searchFilter = Object.assign({ $and: [
                { isActive: true },
                (userType && { userType: userType }),
                (status && { status: status })
            ].filter((option) => !!option) }, (search && {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
            ],
        }));
        const totalRecords = yield User_1.default.countDocuments(searchFilter);
        const totalPages = Math.ceil(totalRecords / limit);
        const hasMore = page < totalPages;
        const selectedFields = `email userType lastName firstName status addresses`;
        const users = yield User_1.default.find(searchFilter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select(selectedFields)
            .exec();
        return {
            users,
            meta: {
                totalRecords,
                totalPages,
                currentPage: page,
                limit,
                hasMore,
            }
        };
    }
    catch (err) {
        console.log('err', err);
        return err;
    }
});
exports.getAllUsersService = getAllUsersService;
const createUserService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: body.email }, { email: 1 });
        if (user) {
            return {
                message: constants_1.Messages.Duplicate_Email,
                email: body.email
            };
        }
        const newUser = new User_1.default(body);
        const savedUser = yield newUser.save();
        savedUser.createdBy = savedUser._id;
        savedUser.updatedBy = savedUser._id;
        yield savedUser.save();
        return savedUser;
    }
    catch (err) {
        return err;
    }
});
exports.createUserService = createUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(id);
        return deletedUser;
    }
    catch (err) {
        return err;
    }
});
exports.deleteUserService = deleteUserService;
const updateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.find({ _id: id });
        let newAddress = null;
        let userUpdateObj = {
            $set: data
        };
        if (data === null || data === void 0 ? void 0 : data.address) {
            newAddress = data === null || data === void 0 ? void 0 : data.address;
            data === null || data === void 0 ? true : delete data.address;
            userUpdateObj = Object.assign(Object.assign({}, userUpdateObj), { $push: { addresses: newAddress } });
        }
        const userUpdate = yield User_1.default.findOneAndUpdate({ _id: id }, userUpdateObj, { new: true, runValidators: true, upsert: true });
        return userUpdate;
    }
    catch (err) {
        return err;
    }
});
exports.updateUserService = updateUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedFields = `email userType lastName firstName status addresses isVerified favoriteProducts`;
        return yield User_1.default.findOne({ _id: id }, selectedFields);
    }
    catch (err) {
        return err;
    }
});
exports.getUserByIdService = getUserByIdService;
