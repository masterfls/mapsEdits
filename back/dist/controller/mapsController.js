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
exports.polylines = exports.getPolylineId = exports.deletePolyline = exports.getPolyline = void 0;
const mapService_1 = require("../services/mapService");
const getPolyline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linea = req.body;
        const savelinea = yield (0, mapService_1.savePolyline)(linea);
        res.status(201).json(savelinea);
        // res.status(200).json("aqui se mostrara datos geoespaciales de las polilineas");
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
});
exports.getPolyline = getPolyline;
const deletePolyline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ error: "ID no proporcionado" });
        }
        yield (0, mapService_1.deleteLinea)(Number(id));
        //  res.status(201).json("aqui se mostrara datos geoespaciales de las polilineas");
    }
    catch (error) {
        res.status(400).json({ error: "Error al eliminar la linea seleccionada" });
    }
});
exports.deletePolyline = deletePolyline;
const getPolylineId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json("aqui se mostrara datos geoespaciales de una polyline especificada por id");
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
});
exports.getPolylineId = getPolylineId;
const polylines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const lineas = yield (0, mapService_1.polylineGet)(Number(id));
        res.status(200).json(lineas);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener las lineas" });
    }
});
exports.polylines = polylines;
