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
exports.searchCredential = exports.createCredential = void 0;
const data_source_1 = require("../config/data-source");
const createCredential = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = yield data_source_1.credentialModel.create(credentialData);
    yield data_source_1.credentialModel.save(newCredential);
    return newCredential;
});
exports.createCredential = createCredential;
const searchCredential = (searchData) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = yield data_source_1.credentialModel.findOneBy({ username: searchData.username });
    if (!userId) {
        throw Error("credenciales no encontradas");
    }
    else if (userId.password !== searchData.password) {
        throw Error("password incorrecta");
    }
    else {
        return userId.id;
    }
});
exports.searchCredential = searchCredential;
