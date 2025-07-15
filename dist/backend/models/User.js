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
const mongoose_1 = require("mongoose");
const interfaces_1 = require("./interfaces");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const addressSchema = new mongoose.Schema({
    name: { type: String, require: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        minlength: [10, 'Phone number must be at least 10 digits long'],
        maxlength: [15, 'Phone number cannot exceed 15 digits'],
        validate: {
            validator: function (v) {
                return /^\d+$/.test(v);
            },
            message: (props) => `${props === null || props === void 0 ? void 0 : props.value} is not a valid phone number! Phone number should contain only digits.`
        }
    }
});
// User schema
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: interfaces_1.UserType,
        require: true,
        default: interfaces_1.UserType.User
    },
    addresses: [{
            type: addressSchema,
            required: false
        }],
    status: { type: String, enum: interfaces_1.Status, default: 'active' },
    version: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next(); // Skip if password is not modified
        const saltRounds = +`${process.env.PASSWORD_SALT}`;
        this.password = yield bcrypt.hash(this.password, saltRounds);
        next();
    });
});
userSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const update = this.getUpdate();
        const password = (_a = update === null || update === void 0 ? void 0 : update.$set) === null || _a === void 0 ? void 0 : _a.password;
        if (password) {
            const salt = yield bcrypt.genSalt(+`${process.env.PASSWORD_SALT}`);
            const hashedPassword = yield bcrypt.hash(password, salt);
            this.set({ password: hashedPassword });
        }
        this.set({ updatedAt: new Date() });
        next();
    });
});
exports.default = (0, mongoose_1.model)('User', userSchema);
