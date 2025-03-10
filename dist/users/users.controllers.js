"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = require("./users.service"); // Ensure correct import
const validate_request_1 = __importDefault(require("../_middleware/validate-request"));
const joi_1 = __importDefault(require("joi"));
const getAll = (req, res, next) => {
    users_service_1.userService.getAll()
        .then(users => res.json(users))
        .catch(next);
};
const getById = (req, res, next) => {
    const id = Number(req.params.id);
    users_service_1.userService.getById(id)
        .then(user => res.json(user))
        .catch(next);
};
const create = (req, res, next) => {
    users_service_1.userService.create(req.body)
        .then(() => res.json({ message: "User created" }))
        .catch(next);
};
const update = (req, res, next) => {
    const id = Number(req.params.id);
    users_service_1.userService.update(id, req.body)
        .then(() => res.json({ message: "User updated" }))
        .catch(next);
};
const _delete = (req, res, next) => {
    const id = Number(req.params.id);
    users_service_1.userService.delete(id)
        .then(() => res.json({ message: "User deleted" }))
        .catch(next);
};
const createSchema = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        role: joi_1.default.string().valid('Admin', 'User').required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required(),
    });
    return (0, validate_request_1.default)(req, next, schema); // Ensure function exits on validation failure
};
const updateSchema = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().empty(''),
        firstName: joi_1.default.string().empty(''),
        lastName: joi_1.default.string().empty(''),
        role: joi_1.default.string().valid('Admin', 'User').empty(''),
        email: joi_1.default.string().email().empty(''),
        password: joi_1.default.string().min(6).empty(''),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    return (0, validate_request_1.default)(req, next, schema);
};
const userControllers = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    createSchema,
    updateSchema
};
exports.default = userControllers;
