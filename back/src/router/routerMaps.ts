import { Router } from "express";
import { getPolyline, getPolylineId } from "../controller/mapsController";

const router: Router = Router()

router.post("/api/lineas", getPolyline);
router.get("/api/lineas/:id", getPolylineId);

export default router;