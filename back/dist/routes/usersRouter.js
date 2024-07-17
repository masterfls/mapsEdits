"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//GET /users --> obtiene todos los usuarios
//GET /users/id: --> obtener usuario por id
//POST /users/register --> crear un nuevo usuario
const usersController_1 = require("../controllers/usersController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/users", usersController_1.getUsers);
router.get("/users/:id", usersController_1.getUsersId);
router.post("/users/register", usersController_1.register);
router.post("/users/login", usersController_1.loginUsers);
exports.default = router;
