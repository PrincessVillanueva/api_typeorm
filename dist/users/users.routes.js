"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const users_controllers_1 = __importDefault(require("./users.controllers"));
exports.usersRoutes = (0, express_1.Router)();
exports.usersRoutes.get('/', users_controllers_1.default.getAll);
exports.usersRoutes.get('/:id', users_controllers_1.default.getById);
exports.usersRoutes.post('/', users_controllers_1.default.createSchema, users_controllers_1.default.create);
exports.usersRoutes.put('/:id', users_controllers_1.default.updateSchema, users_controllers_1.default.update);
exports.usersRoutes.delete('/:id', users_controllers_1.default.delete);
