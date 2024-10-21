"use strict";
//en esta carpeta se realiza la configuracion a la base de datos utilizando postgreSQL
//IMPORTANTE: ANTES DE FINALIZAR EL PROYECTO, DEBO VERIFICAR VARIAS COSAS: 
//1) CONFIGURAR .ENV Y VARIOS ARCHIVOS DE LA BASE DE DATOS QUE NECESITO PONERLOS AHI.
// 1) para guardar la informacion de los edits que realiza el usuario en el maps, se guardan como datos geoespaciales
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATH = exports.ACCESS_TOKEN_SECRET = exports.MJ_APIKEY_PRIVATE = exports.MJ_APIKEY_PUBLIC = exports.PORT = exports.DB_TYPE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.DB_NAME = void 0;
const dotenv_1 = __importDefault(require("dotenv")); // Importar dotenv
dotenv_1.default.config({ path: '../../.env' }); // Cargar las variables de entorno
exports.DB_NAME = process.env.DB_NAME;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_TYPE = process.env.DB_TYPE;
exports.PORT = process.env.PORT;
exports.MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC;
exports.MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.PATH = process.env.PATH;
// console.log(`DB_NAME: ${DB_NAME}`);
// console.log(`DB_HOST: ${DB_HOST}`);
// console.log(`DB_PORT: ${DB_PORT}`);
// console.log(`DB_USERNAME: ${DB_USERNAME}`);
// console.log(`DB_PASSWORD: ${DB_PASSWORD}`);
// console.log(`DB_TYPE: ${DB_TYPE}`);
// console.log(`PORT: ${PORT}`);
// console.log(`MJ_APIKEY_PUBLIC: ${MJ_APIKEY_PUBLIC}`);
// console.log(`MJ_APIKEY_PRIVATE: ${MJ_APIKEY_PRIVATE}`);
// console.log(`ACCESS_TOKEN_SECRET: ${ACCESS_TOKEN_SECRET}`);
// console.log(`PATH: ${PATH}`);
