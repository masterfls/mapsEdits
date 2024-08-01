import { Router } from "express";
import { deletePolyline, getPolyline, getPolylineId, polylines } from "../controller/mapsController";

const router: Router = Router()

router.post("/api/lineas", getPolyline);
router.get("/api/lineas/get", polylines)
router.get("/api/linea/:id", getPolylineId);
router.delete("/api/linea/delete", deletePolyline)

export default router;