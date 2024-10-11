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
const express_1 = require("express");
const tokenvalidate_1 = __importDefault(require("../middleware/tokenvalidate"));
const UserService_1 = require("../services/UserService");
const router = (0, express_1.Router)();
router.get("/test", (req, res) => {
    res.send("Test route is working");
});
router.get("/get", usersController_1.getUsers);
router.get("/id", usersController_1.getUsersId);
router.post("/register", usersController_1.register);
router.post("/login", usersController_1.loginUsers);
router.get("/disabled", usersController_1.getdisabled);
router.put("/update", usersController_1.rolcontroller);
router.delete("/delete", usersController_1.deleteUser);
router.get('/validate/token', tokenvalidate_1.default, (req, res) => {
    res.json(req.user);
});
router.get('/confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = router;
