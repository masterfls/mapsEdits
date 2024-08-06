import { Router } from "express";
import { deletePolyline, getPolyline, getPolylineId, polylines } from "../controller/mapsController";
import authMiddleware from "../middleware/tokenvalidate";

const router: Router = Router()

router.post("/api/lineas", getPolyline, authMiddleware, (req: any,res) => {
    res.json(req.user.id)
});
router.get("/api/lineas/get", polylines)
router.get("/api/linea/:id", getPolylineId);
router.delete("/api/linea/delete", deletePolyline)

export default router;