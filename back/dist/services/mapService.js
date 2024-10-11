"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLinea = exports.polylineGet = exports.savePolyline = void 0;
const data_source_1 = require("../config/data-source");
const savePolyline = async (data) => {
    console.log("dentro de savePolyline");
    // Busca al usuario por su ID
    const user = await data_source_1.UserModel.findOneBy({ id: data.userId });
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
    await data_source_1.MapsModel.save(newPolyline);
    return newPolyline;
};
exports.savePolyline = savePolyline;
const polylineGet = async (id) => {
    console.log("hola");
    const maps = await data_source_1.MapsModel.find({
        where: { user: { id: id } }
    }); //accedo a la tabla Mpas de la DB y me traigo todo lo que hay con el metodo find
    return maps;
};
exports.polylineGet = polylineGet;
const deleteLinea = async (id) => {
    const line = await data_source_1.MapsModel.find({
        where: { id: id }
    }); //accedo a la tabla Mpas de la DB y me traigo todo lo que hay con el metodo find
    const del = await data_source_1.MapsModel.delete(id);
    return;
};
exports.deleteLinea = deleteLinea;
