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
exports.deleteLinea = exports.polylineGet = exports.savePolyline = void 0;
const data_source_1 = require("../config/data-source");
const savePolyline = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("dentro de savePolyline");
    // Busca al usuario por su ID
    const user = yield data_source_1.UserModel.findOneBy({ id: data.userId });
    if (!user) {
        throw new Error("Usuario Inexistente");
    }
    // Crea una nueva línea
    const newPolyline = data_source_1.MapsModel.create({
        coordenadas: data.coordenadas,
        estilos: data.estilos,
        user: user,
    });
    // Guarda la nueva línea en la base de datos
    yield data_source_1.MapsModel.save(newPolyline);
    return newPolyline;
});
exports.savePolyline = savePolyline;
const polylineGet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hola");
    const maps = yield data_source_1.MapsModel.find({
        where: { user: { id: id } }
    }); //accedo a la tabla Mpas de la DB y me traigo todo lo que hay con el metodo find
    return maps;
});
exports.polylineGet = polylineGet;
const deleteLinea = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const line = yield data_source_1.MapsModel.find({
        where: { id: id }
    }); //accedo a la tabla Mpas de la DB y me traigo todo lo que hay con el metodo find
    const del = yield data_source_1.MapsModel.delete(id);
    return;
});
exports.deleteLinea = deleteLinea;
