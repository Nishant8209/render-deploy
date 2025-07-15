"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Define routes
router.get('/', userController_1.getUsers);
router.post('/create', userController_1.createUser);
router.delete('/:id', userController_1.deleteUser);
router.put('/:id', userController_1.updateUser);
router.get('/:id', userController_1.getUserById);
exports.default = router;
