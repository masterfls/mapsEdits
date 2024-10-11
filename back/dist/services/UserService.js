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
const UserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find();
    return users;
});
exports.UserService = UserService;
const returnUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOneBy({ id });
    const credentials = yield data_source_1.CredentialModel.findOneBy({ id });
    const username = credentials === null || credentials === void 0 ? void 0 : credentials.username;
    return { user, username };
});
exports.returnUser = returnUser;
const UserRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const disabled = "disabled";
    const users = yield data_source_1.UserModel.find({ where: { rol: disabled } });
    return users;
});
exports.UserRole = UserRole;
const userRole = (id, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOneBy({ id });
    if (user) {
        user.rol = rol;
        yield data_source_1.UserModel.save(user);
        return user;
    }
    else {
        console.log("no se encontró el usuario");
        return null;
    }
});
exports.userRole = userRole;
const userDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.delete({ id });
    yield (0, CredentialService_1.credentialsDelete)(id);
    if (user.affected === 0) {
        console.log("no se encontró el usuario");
    }
    else {
        console.log("usuario eliminado");
    }
});
exports.userDelete = userDelete;
const validateUser = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    const dataemail = yield data_source_1.UserModel.findOneBy({ email });
    const datausername = yield data_source_1.CredentialModel.findOneBy({ username });
    return !!(dataemail || datausername);
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const email = userData.email;
    const username = userData.username;
    const validation = yield validateUser(email, username);
    if (validation) {
        return null; // El usuario ya existe
    }
    else {
        const newUser = yield data_source_1.UserModel.create(userData);
        const newCredential = yield (0, CredentialService_1.createCredential)({
            username: userData.username,
            password: userData.password
        });
        newUser.credential = newCredential;
        newUser.confirmationToken = (0, uuid_1.v4)();
        yield data_source_1.UserModel.save(newUser);
        return newUser;
    }
});
exports.createUser = createUser;
const loginUser = (Credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield (0, CredentialService_1.searchCredential)(Credentials);
    if (userExist) {
        console.log("token generado: ", userExist);
    }
});
exports.loginUser = loginUser;
const sendConfirmationEmail = (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield mailjetClient.post('send', { version: 'v3.1' }).request({
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
});
exports.sendConfirmationEmail = sendConfirmationEmail;
const confirmEmail = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOne({ where: { confirmationToken: token } });
    if (!user) {
        throw new Error('Invalid or expired token');
    }
    user.status = 'active';
    user.confirmationToken = null;
    yield data_source_1.UserModel.save(user);
    return user;
});
exports.confirmEmail = confirmEmail;
