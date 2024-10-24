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
exports.credentialsDelete = exports.searchCredential = exports.createCredential = void 0;
const data_source_1 = require("../config/data-source");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createCredential = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    //codificacion de las credenciales antes de guardarlas
    const salt = bcrypt.genSaltSync(10); //genera una sal (string aleatorio que se añade a la contraseña), el parametro 10 determina la complejidad y el tiempo que tomara generar la sal
    const hashedPassword = bcrypt.hashSync(credentialData.password, salt); //codificacion de la contraseña, toma la contraseña proporcionada por el usuario y la sal generada anteriormente, y devuelve la contraseña codificada
    const newCredential = yield data_source_1.CredentialModel.create(Object.assign(Object.assign({}, credentialData), { password: hashedPassword }));
    yield data_source_1.CredentialModel.save(newCredential); //guardo esas credenciales con el metodo save en la base de datos
    return newCredential; //retorno el par de credenciales creada
});
exports.createCredential = createCredential;
const searchCredential = (searchData) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield data_source_1.CredentialModel.findOneBy({ username: searchData.username }); //uso el metodo finOneBy para obtener el registro en la tabala de la base de datos que coincida en el username brindado (en caso de existir)
    if (userId) {
        const passwordIsValid = bcrypt.compareSync(searchData.password, userId.password);
        if (passwordIsValid) {
            const token = jwt.sign({ id: userId.id }, 'your_secret_key', { expiresIn: '1h' }); //generacion del token
            return token;
        }
        else {
            return false;
        }
    }
    else { //si no existe significa que las credenciales no existe por lo que el usuario no existe o las ingreso mal
        throw new Error("Credenciales Not Found");
    }
});
exports.searchCredential = searchCredential;
const credentialsDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = yield data_source_1.CredentialModel.delete({ id: id });
    if (credential.affected === 0) {
        console.log("no se encontraron las credenciales del usuario especificado");
    }
    else {
        console.log("credenciales eliminadas");
    }
});
exports.credentialsDelete = credentialsDelete;
