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
exports.appointmentStatus = exports.createAppointment = exports.detalle = exports.returnAppointment = void 0;
const data_source_1 = require("../config/data-source");
const arrayAppointment = [];
const returnAppointment = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.appointmentModel.find();
    return appointment;
});
exports.returnAppointment = returnAppointment;
const detalle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.appointmentModel.findOneBy({ id: id });
    if (!appointment)
        throw Error("Turno Inexistente");
    return appointment;
});
exports.detalle = detalle;
const createAppointment = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = yield data_source_1.appointmentModel.create(appointmentData);
    yield data_source_1.appointmentModel.save(newAppointment);
    const user = yield data_source_1.UserModel.findOneBy({ id: appointmentData.userId });
    if (!user)
        throw Error("Usuario Inexistente");
    newAppointment.user = user;
    yield data_source_1.appointmentModel.save(newAppointment);
    return newAppointment;
});
exports.createAppointment = createAppointment;
const appointmentStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.appointmentModel.findOneBy({ id: id });
    if (!appointment)
        throw Error("Turno Inexistente");
    appointment.status = "cancelled";
    yield data_source_1.appointmentModel.save(appointment);
});
exports.appointmentStatus = appointmentStatus;
