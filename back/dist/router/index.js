"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //me traigo el metodo Router de express, este metodo se utiliza para manejar rutas
const routerMaps_1 = __importDefault(require("./routerMaps"));
const routerUser_1 = __importDefault(require("./routerUser"));
const router = (0, express_1.Router)(); // creo mi enrutador
router.use("/", routerUser_1.default);
router.use("/", routerMaps_1.default);
exports.default = router;
