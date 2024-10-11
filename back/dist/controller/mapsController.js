"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polylines = exports.getPolylineId = exports.deletePolyline = exports.getPolyline = void 0;
const mapService_1 = require("../services/mapService");
const getPolyline = async (req, res) => {
    try {
        const linea = req.body;
        const savelinea = await (0, mapService_1.savePolyline)(linea);
        res.status(201).json(savelinea);
        // res.status(200).json("aqui se mostrara datos geoespaciales de las polilineas");
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
};
exports.getPolyline = getPolyline;
const deletePolyline = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ error: "ID no proporcionado" });
        }
        await (0, mapService_1.deleteLinea)(Number(id));
        //  res.status(201).json("aqui se mostrara datos geoespaciales de las polilineas");
    }
    catch (error) {
        res.status(400).json({ error: "Error al eliminar la linea seleccionada" });
    }
};
exports.deletePolyline = deletePolyline;
const getPolylineId = async (req, res) => {
    try {
        res.status(200).json("aqui se mostrara datos geoespaciales de una polyline especificada por id");
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
};
exports.getPolylineId = getPolylineId;
const polylines = async (req, res) => {
    try {
        const id = req.query.id;
        const lineas = await (0, mapService_1.polylineGet)(Number(id));
        res.status(200).json(lineas);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener las lineas" });
    }
};
exports.polylines = polylines;
