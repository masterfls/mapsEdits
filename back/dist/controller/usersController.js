"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsers = exports.register = exports.getUsersId = exports.getdisabled = exports.deleteUser = exports.rolcontroller = exports.getUsers = void 0;
const UserService_1 = require("../services/UserService");
const CredentialService_1 = require("../services/CredentialService");
const getUsers = async (req, res) => {
    try {
        const user = await (0, UserService_1.UserService)();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
};
exports.getUsers = getUsers;
const rolcontroller = async (req, res) => {
    try {
        const { id, role } = req.body;
        const user = await (0, UserService_1.userRole)(id, role);
        console.log("Usuario modificado");
        res.status(200).json({ message: "Rol de usuario modificado" });
    }
    catch (error) {
        console.error({ error: "error al modificar rol del usuario" });
    }
};
exports.rolcontroller = rolcontroller;
const deleteUser = async (req, res) => {
    try {
        const id = req.query.id;
        const user = await (0, UserService_1.userDelete)(Number(id));
        console.log("usuario eliminado de la base de datos");
        res.status(200).json({ message: "User Delete" });
    }
    catch (error) {
        console.error({ error: "error al eliminar usuario de la base de datos" });
    }
};
exports.deleteUser = deleteUser;
const getdisabled = async (req, res) => {
    try {
        const user = await (0, UserService_1.UserRole)();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener usuarios" });
    }
};
exports.getdisabled = getdisabled;
const getUsersId = async (req, res) => {
    try {
        const id = req.query.id;
        const userId = await (0, UserService_1.returnUser)(Number(id));
        res.status(200).json(userId);
    }
    catch (error) {
        res.status(400).json({ error: "error al obtener el usuario" });
    }
};
exports.getUsersId = getUsersId;
const register = async (req, res) => {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser = await (0, UserService_1.createUser)({ name, email, birthdate, nDni, username, password });
        if (newUser == null) {
            return res.status(400).json({ message: "Registro fallido" });
        }
        else {
            // Genera el enlace de confirmación
            const confirmationLink = `https://ievg.online/users/confirmation?token=${newUser.confirmationToken}`;
            // Crea el texto del mensaje
            const text = `Por favor, confirma tu cuenta haciendo clic en el siguiente enlace: ${confirmationLink}`;
            // Envía el correo de confirmación
            await (0, UserService_1.sendConfirmationEmail)(newUser.email, "Confirma tu cuenta", text);
            console.log('User registered. Please check your email to confirm your account.');
            res.status(200).json(false); // Indica que el usuario fue creado exitosamente.
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
};
exports.register = register;
const loginUsers = async (req, res) => {
    try {
        console.log("hola");
        const { username, password } = req.body;
        const token = await (0, CredentialService_1.searchCredential)({ username, password });
        if (token) {
            return res.json({ token });
        }
        throw new Error("invalid credentials or user no logedd");
    }
    catch (error) {
        return res.status(400).json({ message: "invalid credentials" });
    }
};
exports.loginUsers = loginUsers;
