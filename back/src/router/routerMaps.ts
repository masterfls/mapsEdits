import { Router } from "express";
import { getPolyline, getPolylineId, polylines } from "../controller/mapsController";

const router: Router = Router()

router.post("/api/lineas", getPolyline);
router.get("/api/lineas/get", polylines)
router.get("/api/linea/:id", getPolylineId);

export default router;