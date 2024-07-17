"use strict";
//GET /appointments  --> obtener todos los turnos
//GET /appointments /:id --> obtener un turno por ID
//POST /appointments /schedule --> crear un nuevo turno
//PUT /appointments /cancel --> cancelar turno
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentsController_1 = require("../controllers/appointmentsController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/appointments", appointmentsController_1.getAppointments);
router.get("/appointment/:id", appointmentsController_1.getAppointmentsId);
router.post("/appointment/schedule", appointmentsController_1.login);
router.put("/appointment/cancel/:id", appointmentsController_1.cancelAppointment);
exports.default = router;
