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
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json("aqui se mostrara la lista de usuarios");
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
});
exports.getUsers = getUsers;
const getUsersId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json("aqui se mostrara el usuario por id");
    }
    catch (error) {
        res.status(400).json({ error: "error al obtener el usuario" });
    }
});
exports.getUsersId = getUsersId;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json("aqui se podran registrar los usuarios");
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.register = register;
const loginUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json("aqui se podran loguear los usuarios");
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.loginUsers = loginUsers;
