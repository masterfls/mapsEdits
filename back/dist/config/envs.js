"use strict";
//en esta carpeta se realiza la configuracion a la base de datos utilizando postgreSQL
//IMPORTANTE: ANTES DE FINALIZAR EL PROYECTO, DEBO VERIFICAR VARIAS COSAS: 
//1) CONFIGURAR .ENV Y VARIOS ARCHIVOS DE LA BASE DE DATOS QUE NECESITO PONERLOS AHI.
// 1) para guardar la informacion de los edits que realiza el usuario en el maps, se guardan como datos geoespaciales
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB_TYPE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.DB_NAME = void 0;
require("dotenv/config");
exports.DB_NAME = process.env.DB_NAME;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_TYPE = process.env.DB_TYPE;
exports.PORT = process.env.PORT;
