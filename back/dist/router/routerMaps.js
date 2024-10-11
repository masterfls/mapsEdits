"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mapsController_1 = require("../controller/mapsController");
const tokenvalidate_1 = __importDefault(require("../middleware/tokenvalidate"));
const router = (0, express_1.Router)();
router.post("/post", mapsController_1.getPolyline, tokenvalidate_1.default, (req, res) => {
    res.json(req.user.id);
});
router.get("/get", mapsController_1.polylines);
router.get("/:id", mapsController_1.getPolylineId);
router.delete("/delete", mapsController_1.deletePolyline);
exports.default = router;
