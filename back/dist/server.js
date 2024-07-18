"use strict";
// necesito comunicarme con mi DB. para generar un nuevo usuario (mas adelante para editar un usuario existente e eliminar)
// obtener datos de los usuarios creados, verificar informacion para permitir acceso
// pasos:
// 1) crear servidor y poner en escucha
// 2) ir creando las 3 carpetas principales que se encargaran de las peticiones y respuestas
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //me traigo la libreria express que me servira para crear mi servidor
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./router/index"));
const app = (0, express_1.default)(); //creo mi servidor en la constante app
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(index_1.default); //tengo el servidor, el enrutador, se hace la peticion y en esta linea lego hacia donde ira la solicitud, en este caso al anrutador
exports.default = app;
