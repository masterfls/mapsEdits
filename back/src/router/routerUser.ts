import { register, getUsers, getUsersId, loginUsers } from "../controller/usersController";
import { Router } from "express";
import { verifyToken } from "../middleware/tokenvalidate";

const router: Router = Router()

router.get("/users", getUsers);
router.get("/users/:id", getUsersId);
router.post("/users/register", register)
router.post("/users/login", loginUsers)


export default router;
