"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); // Importar dotenv
dotenv_1.default.config(); // Cargar el archivo .env
require("reflect-metadata");
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
const data_source_1 = require("./config/data-source");
// Cargar las variables de entorno desde .env
console.log("MJ_APIKEY_PUBLIC:", process.env.MJ_APIKEY_PUBLIC); // Debe mostrar tu API Key
console.log("MJ_APIKEY_PRIVATE:", process.env.MJ_APIKEY_PRIVATE); // Debe mostrar tu API Secret
data_source_1.AppDataSource.initialize()
    .then(res => {
    console.log("conexion a la base de datos realizada con exito");
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`servidor escuchando en el puerto ${envs_1.PORT}`);
    });
})
    .catch(error => console.log("Error al inicializar la base de datos:", error));
