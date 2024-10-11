import { Router } from "express";
import { deletePolyline, getPolyline, getPolylineId, polylines } from "../controller/mapsController";
import authMiddleware from "../middleware/tokenvalidate";

const router: Router = Router()

router.post("/post", getPolyline, authMiddleware, (req: any,res) => {
    res.json(req.user.id)
});
router.get("/get", polylines)
router.get("/:id", getPolylineId);
router.delete("/delete", deletePolyline)

export default router;