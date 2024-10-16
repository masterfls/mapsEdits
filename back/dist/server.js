"use strict";
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
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://ievg-online-21570d3c5e46.herokuapp.com' // Cambia esto a la URL de tu app en Heroku
        : 'http://localhost:3000', // Cambia esto a la URL de tu frontend local
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(index_1.default); //tengo el servidor, el enrutador, se hace la peticion y en esta linea lego hacia donde ira la solicitud, en este caso al anrutador
exports.default = app;
