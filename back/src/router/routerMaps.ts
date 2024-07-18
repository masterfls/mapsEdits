import { getPolyline, getPolylineId } from "../controller/mapsController";
import { Router } from "express";

const router: Router = Router()

router.post("/polyline", getPolyline);
router.get("/polyline/:id", getPolylineId);

export default router;