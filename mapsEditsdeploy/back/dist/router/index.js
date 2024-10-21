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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersController_1 = require("../controller/usersController");
const tokenvalidate_1 = __importDefault(require("../middleware/tokenvalidate"));
const UserService_1 = require("../services/UserService");
const mapsController_1 = require("../controller/mapsController");
const express_1 = require("express"); //me traigo el metodo Router de express, este metodo se utiliza para manejar rutas
const router = (0, express_1.Router)(); // creo mi enrutador
//rutes of users
router.get("/users/test", (req, res) => {
    res.send("Test route is working");
});
router.get("/users/get", usersController_1.getUsers);
router.get("/users/id", usersController_1.getUsersId);
router.post("/users/register", usersController_1.register);
router.post("/users/login", usersController_1.loginUsers);
router.get("/users/disabled", usersController_1.getdisabled);
router.put("/users/update", usersController_1.rolcontroller);
router.delete("/users/delete", usersController_1.deleteUser);
router.get('/users/validate/token', tokenvalidate_1.default, (req, res) => {
    res.json(req.user);
});
router.get('/users/confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    if (typeof token !== 'string') {
        return res.status(400).send('Invalid token');
    }
    try {
        // Llama a la función de confirmación de correo electrónico
        yield (0, UserService_1.confirmEmail)(token);
        res.status(200).send('Email confirmed successfully');
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//rutes of maps
router.post("/post", mapsController_1.getPolyline, tokenvalidate_1.default, (req, res) => {
    res.json(req.user.id);
});
router.get("/api/lineas/get", mapsController_1.polylines);
router.get("/api/lineas/:id", mapsController_1.getPolylineId);
router.delete("/api/lineas/delete", mapsController_1.deletePolyline);
exports.default = router;
