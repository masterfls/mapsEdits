"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapsController_1 = require("../controller/mapsController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/polyline", mapsController_1.getPolyline);
router.get("/polyline/:id", mapsController_1.getPolylineId);
exports.default = router;
