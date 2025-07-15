"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.failResponse = exports.successResponse = void 0;
const constants_1 = require("./constants");
// Success response format
const successResponse = (res, data, message = constants_1.Messages.Success, statusCode = 200) => {
    return res.status(statusCode).json({
        status: constants_1.Messages.Success,
        message,
        data,
    });
};
exports.successResponse = successResponse;
// Failure response format (for client-side errors)
const failResponse = (res, message = constants_1.Messages.Fail, statusCode = 400) => {
    return res.status(statusCode).json({
        status: constants_1.Messages.Fail,
        message,
    });
};
exports.failResponse = failResponse;
// Error response format (for server-side errors)
const errorResponse = (res, message = constants_1.Messages.Internal_Server_Error, statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        status: constants_1.Messages.Internal_Server_Error,
        message,
        error,
    });
};
exports.errorResponse = errorResponse;
