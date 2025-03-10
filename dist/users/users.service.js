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
exports.userService = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.find();
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findOne({ where: { id } });
});
const create = (params) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield userRepository.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }
    const hashedPassword = yield bcryptjs_1.default.hash(params.password, 10);
    const newUser = userRepository.create({ lastName: params.lastName, firstName: params.firstName, email: params.email, passwordHash: hashedPassword, role: params.role, title: params.title });
    yield userRepository.save(newUser);
});
const update = (id, params) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findOne({ where: { id } });
    if (!user)
        throw 'User not found';
    if (params.email && params.email !== user.email) {
        if (yield userRepository.findOne({ where: { email: params.email } })) {
            throw 'Email "' + params.email + '" is already taken';
        }
    }
    if (params.password) {
        params.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
    }
    yield userRepository.update(id, { title: params.title, firstName: params.firstName, lastName: params.lastName, email: params.email, passwordHash: params.passwordHash, role: params.role });
});
const _delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield userRepository.delete(id);
});
exports.userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
