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
exports.loginUsers = exports.register = exports.getUsersId = exports.getUsers = void 0;
const UserService_1 = require("../services/UserService");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, UserService_1.UsserService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
});
exports.getUsers = getUsers;
const getUsersId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userid = yield (0, UserService_1.returnUser)(Number(id));
        res.status(200).json(userid);
    }
    catch (error) {
        res.status(400).json({ error: "error al obtener el usuario" });
    }
});
exports.getUsersId = getUsersId;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser = yield (0, UserService_1.createUsser)({
            name, email, birthdate, nDni, username, password
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.register = register;
const loginUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userExist = yield (0, UserService_1.loginUserService)({
            username, password
        });
        if (userExist) {
            return res.status(200).json({ message: "User Logged" });
        }
        throw new Error("Credenciales incorrectas, usuario no logueado");
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.loginUsers = loginUsers;
