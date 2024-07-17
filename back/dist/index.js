"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
const data_source_1 = require("./config/data-source");
data_source_1.AppDataSource.initialize()
    .then(res => {
    console.log("conexion a la base de datos realizada con exito");
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`servidor escuchando en el puerto ${envs_1.PORT}`);
    });
});
// app.listen(PORT, () =>{
//     console.log(`servidor escuchando en el puerto ${PORT}`)
// })
