"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmail = exports.userRole = exports.userDelete = exports.UserRole = exports.sendConfirmationEmail = exports.loginUser = exports.UserService = exports.returnUser = exports.createUser = void 0;
const dotenv_1 = __importDefault(require("dotenv")); // Importar dotenv
dotenv_1.default.config({ path: '../../.env' }); // Cargar las variables de entorno
const data_source_1 = require("../config/data-source");
const CredentialService_1 = require("./CredentialService");
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const uuid_1 = require("uuid");
console.log('MJ_APIKEY_PUBLIC:', process.env.MJ_APIKEY_PUBLIC);
console.log('MJ_APIKEY_PRIVATE:', process.env.MJ_APIKEY_PRIVATE);
// Claves de API de Mailjet
const mailjetClient = new node_mailjet_1.default.Client({
    apiKey: process.env.MJ_APIKEY_PUBLIC, // Asegúrate de que estas claves estén en tus variables de entorno
    apiSecret: process.env.MJ_APIKEY_PRIVATE
});
// Funciones de servicio
const UserService = async () => {
    const users = await data_source_1.UserModel.find();
    return users;
};
exports.UserService = UserService;
const returnUser = async (id) => {
    const user = await data_source_1.UserModel.findOneBy({ id });
    const credentials = await data_source_1.CredentialModel.findOneBy({ id });
    const username = credentials?.username;
    return { user, username };
};
exports.returnUser = returnUser;
const UserRole = async () => {
    const disabled = "disabled";
    const users = await data_source_1.UserModel.find({ where: { rol: disabled } });
    return users;
};
exports.UserRole = UserRole;
const userRole = async (id, rol) => {
    const user = await data_source_1.UserModel.findOneBy({ id });
    if (user) {
        user.rol = rol;
        await data_source_1.UserModel.save(user);
        return user;
    }
    else {
        console.log("no se encontró el usuario");
        return null;
    }
};
exports.userRole = userRole;
const userDelete = async (id) => {
    const user = await data_source_1.UserModel.delete({ id });
    await (0, CredentialService_1.credentialsDelete)(id);
    if (user.affected === 0) {
        console.log("no se encontró el usuario");
    }
    else {
        console.log("usuario eliminado");
    }
};
exports.userDelete = userDelete;
const validateUser = async (email, username) => {
    const dataemail = await data_source_1.UserModel.findOneBy({ email });
    const datausername = await data_source_1.CredentialModel.findOneBy({ username });
    return !!(dataemail || datausername);
};
const createUser = async (userData) => {
    const email = userData.email;
    const username = userData.username;
    const validation = await validateUser(email, username);
    if (validation) {
        return null; // El usuario ya existe
    }
    else {
        const newUser = await data_source_1.UserModel.create(userData);
        const newCredential = await (0, CredentialService_1.createCredential)({
            username: userData.username,
            password: userData.password
        });
        newUser.credential = newCredential;
        newUser.confirmationToken = (0, uuid_1.v4)();
        await data_source_1.UserModel.save(newUser);
        return newUser;
    }
};
exports.createUser = createUser;
const loginUser = async (Credentials) => {
    const userExist = await (0, CredentialService_1.searchCredential)(Credentials);
    if (userExist) {
        console.log("token generado: ", userExist);
    }
};
exports.loginUser = loginUser;
const sendConfirmationEmail = async (to, subject, text) => {
    try {
        const request = await mailjetClient.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: "tu_email@ejemplo.com",
                        Name: "Tu Nombre"
                    },
                    To: [
                        {
                            Email: to,
                            Name: "Nombre del destinatario"
                        }
                    ],
                    Subject: subject,
                    TextPart: text,
                }
            ]
        });
        console.log(request.body);
    }
    catch (err) {
        console.error(err);
    }
};
exports.sendConfirmationEmail = sendConfirmationEmail;
const confirmEmail = async (token) => {
    const user = await data_source_1.UserModel.findOne({ where: { confirmationToken: token } });
    if (!user) {
        throw new Error('Invalid or expired token');
    }
    user.status = 'active';
    user.confirmationToken = null;
    await data_source_1.UserModel.save(user);
    return user;
};
exports.confirmEmail = confirmEmail;
