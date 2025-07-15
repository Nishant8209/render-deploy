"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["Admin"] = "admin";
    UserType["User"] = "user";
    UserType["Operator"] = "Operator";
})(UserType || (exports.UserType = UserType = {}));
// enums 
var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["InActive"] = "inactive";
    Status["Deleted"] = "deleted";
})(Status || (exports.Status = Status = {}));
