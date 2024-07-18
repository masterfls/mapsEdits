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
exports.getPolylineId = exports.getPolyline = void 0;
const getPolyline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linea = req.body;
        console.log('linea guardada con exito');
        res.status(201).json({ message: 'linea guardada con exito' });
        res.status(200).json("aqui se mostrara datos geoespaciales de las polilineas");
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
});
exports.getPolyline = getPolyline;
const getPolylineId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json("aqui se mostrara datos geoespaciales de una polyline especificada por id");
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los usuarios" });
    }
});
exports.getPolylineId = getPolylineId;
