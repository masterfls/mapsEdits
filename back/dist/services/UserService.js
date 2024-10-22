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
exports.confirmEmail = exports.sendConfirmationEmail = exports.mailjet = exports.loginUser = exports.createUser = exports.userDelete = exports.userRole = exports.UserRole = exports.returnUser = exports.UserService = void 0;
const dotenv_1 = __importDefault(require("dotenv")); // Importar dotenv
dotenv_1.default.config({ path: '../../.env' }); // Cargar las variables de entorno
const data_source_1 = require("../config/data-source");
const CredentialService_1 = require("./CredentialService");
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const uuid_1 = require("uuid");
const UserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.find(); //accedo a la tabla User de la DB y me traigo todo lo que hay con el metodo find
    return user;
});
exports.UserService = UserService;
const returnUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("estoy aca");
    const user = yield data_source_1.UserModel.findOneBy({ id }); //me traigo de la tabla User de la DB al primer registro que coincida con el id recibido por parametros
    console.log("user:", user);
    const credentials = yield data_source_1.CredentialModel.findOneBy({ id: id });
    const username = credentials === null || credentials === void 0 ? void 0 : credentials.username;
    return { user, username };
});
exports.returnUser = returnUser;
const UserRole = () => __awaiter(void 0, void 0, void 0, function* () {
    const disabled = "disabled";
    const user = yield data_source_1.UserModel.find({ where: { rol: disabled } });
    return user;
});
exports.UserRole = UserRole;
const userRole = (id, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOneBy({ id: id });
    if (user) {
        user.rol = rol;
        yield data_source_1.UserModel.save(user);
        return user;
    }
    else {
        console.log("no es encontro el usuario");
        return user;
    }
});
exports.userRole = userRole;
const userDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.delete({ id: id });
    yield (0, CredentialService_1.credentialsDelete)(id);
    if (user.affected === 0) {
        console.log("no se encontro el usuario");
    }
    else {
        console.log("usuario eliminado");
    }
});
exports.userDelete = userDelete;
const validateUser = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    const dataemail = yield data_source_1.UserModel.findOneBy({ email: email });
    const datausername = yield data_source_1.CredentialModel.findOneBy({ username: username });
    if (dataemail || datausername) {
        return true;
    }
    else {
        return false;
    }
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const email = userData.email;
    const username = userData.username;
    const validation = yield validateUser(email, username);
    if (validation) { //valido el mail del usuario que se esta registrando
        return null;
    }
    else {
        const User = yield data_source_1.UserModel.create(userData); //creo el registro en la DB
        const newCredential = yield (0, CredentialService_1.createCredential)({
            username: userData.username,
            password: userData.password
        }); //accedemos a la funcion createCredential para crear la credencial
        User.credential = newCredential;
        User.confirmationToken = (0, uuid_1.v4)(); //genera un token unico    
        yield data_source_1.UserModel.save(User); //guardamos el registro del usuario creado junto con las credenciales en la DB
        return User;
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
exports.mailjet = node_mailjet_1.default.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);
const sendConfirmationEmail = (toEmail, confirmationLink) => __awaiter(void 0, void 0, void 0, function* () {
    const request = exports.mailjet
        .post("send", { version: 'v3.1' })
        .request({
        Messages: [
            {
                From: {
                    Email: "fernandeztomas735@gmail.com",
                    Name: "-MapsEdits-"
                },
                To: [
                    {
                        Email: toEmail,
                        Name: "Recipient Name"
                    }
                ],
                Subject: "Please confirm your email address",
                TextPart: `Please click the following link to confirm your email address: ${confirmationLink}`,
                HTMLPart: `<h3>Please click the following link to confirm your email address:</h3><a href="${confirmationLink}">Confirm Email</a>`
            }
        ]
    });
    try {
        const response = yield request;
        return response.body;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error sending email');
    }
});
exports.sendConfirmationEmail = sendConfirmationEmail;
const confirmEmail = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOne({ where: { confirmationToken: token } });
    if (!user) {
        throw new Error('Invalid or expired token');
    }
    user.status = 'active'; // Cambiar el estado del usuario a activo
    user.confirmationToken = null;
    yield data_source_1.UserModel.save(user);
    return user;
});
exports.confirmEmail = confirmEmail;
