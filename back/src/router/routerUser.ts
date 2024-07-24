import { register, getUsers, getUsersId, loginUsers } from "../controller/usersController";
import { Router } from "express";
import authMiddleware from "../middleware/tokenvalidate";
const router: Router = Router()

router.get("/users", getUsers);
router.get("/users/:id", getUsersId);
router.post("/users/register", register)
router.post("/users/login", loginUsers)
router.get('/users/validate/token', authMiddleware, (req: any,res) => {
    res.json(req.user.id)
})


export default router;
