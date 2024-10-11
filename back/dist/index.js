"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); // Importar dotenv
dotenv_1.default.config(); // Cargar el archivo .env
require("reflect-metadata");
const server_1 = __importDefault(require("./server"));
// import {PORT} from "./config/envs";
const data_source_1 = require("./config/data-source");
// Cargar las variables de entorno desde .env
const PORT = process.env.PORT || 3002;
data_source_1.AppDataSource.initialize()
    .then(res => {
    console.log("subiendo a heroku");
    console.log("conexion a la base de datos realizada con exito");
    server_1.default.listen(PORT, () => {
        console.log(`servidor escuchando en el puerto ${PORT}`);
    });
})
    .catch(error => console.log("Error al inicializar la base de datos:", error));
