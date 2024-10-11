import { register, getUsers, getUsersId, loginUsers, getdisabled, rolcontroller, deleteUser } from "../controller/usersController";
import { Router } from "express";
import authMiddleware from "../middleware/tokenvalidate";
import { confirmEmail } from "../services/UserService";

const router: Router = Router()

router.get("/test", (req, res) => {
    res.send("Test route is working");
});
router.get("/get", getUsers);
router.get("/id", getUsersId);
router.post("/register", register)
router.post("/login", loginUsers)
router.get("/disabled", getdisabled)
router.put("/update", rolcontroller)
router.delete("/delete", deleteUser)

router.get('/validate/token', authMiddleware, (req: any,res) => {
    res.json(req.user)
})
router.get('/confirmation', async (req, res) => {
    const { token } = req.query;

    if (typeof token !== 'string') {
        return res.status(400).send('Invalid token');
    }

    try {
        // Llama a la función de confirmación de correo electrónico
        await confirmEmail(token);
        res.status(200).send('Email confirmed successfully');
    } catch (error) {
        res.status(400).send(error);
    }
});






export default router;
