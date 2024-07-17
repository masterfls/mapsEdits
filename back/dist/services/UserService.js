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
exports.loginUserService = exports.createUsser = exports.returnUser = exports.UsserService = void 0;
const data_source_1 = require("../config/data-source");
const credentialService_1 = require("./credentialService");
const UsserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find(); // me traigo el Usermodel creado en config
    return users;
});
exports.UsserService = UsserService;
const returnUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOneBy({
        id
    });
    return user;
});
exports.returnUser = returnUser;
const createUsser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield data_source_1.UserModel.create(userData); //crea el registro
    const newCredential = yield (0, credentialService_1.createCredential)({
        username: userData.username,
        password: userData.password
    });
    User.credential = newCredential;
    yield data_source_1.UserModel.save(User); //guardamos el registro en la base de datos
    return User;
});
exports.createUsser = createUsser;
const loginUserService = (credentialsDto) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield (0, credentialService_1.searchCredential)(credentialsDto);
    if (userExist)
        return true;
});
exports.loginUserService = loginUserService;
