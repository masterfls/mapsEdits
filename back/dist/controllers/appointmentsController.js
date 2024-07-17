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
exports.cancelAppointment = exports.login = exports.getAppointmentsId = exports.getAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.returnAppointment)();
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener los turnos" });
    }
});
exports.getAppointments = getAppointments;
const getAppointmentsId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointmentid = yield (0, appointmentService_1.detalle)(Number(id));
        res.status(200).json(appointmentid);
    }
    catch (error) {
        res.status(400).json({ error: "Error al obtener el turno" });
    }
});
exports.getAppointmentsId = getAppointmentsId;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, description, userId } = req.body;
        const newAppointments = yield (0, appointmentService_1.createAppointment)({ date, time, description, userId });
        res.status(200).json(newAppointments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.login = login;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield (0, appointmentService_1.appointmentStatus)(id);
        res.status(200).json({ message: "Turno cancelado" });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.cancelAppointment = cancelAppointment;
