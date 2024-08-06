import { register, getUsers, getUsersId, loginUsers, getdisabled, rolcontroller, deleteUser } from "../controller/usersController";
import { Router } from "express";
import authMiddleware from "../middleware/tokenvalidate";
import { confirmEmail } from "../services/UserService";

const router: Router = Router()

router.get("/users", getUsers);
router.get("/users/id", getUsersId);
router.post("/users/register", register)
router.post("/users/login", loginUsers)
router.get("/users/disabled", getdisabled)
router.put("/users/update", rolcontroller)
router.delete("/user/delete", deleteUser)

router.get('/users/validate/token', authMiddleware, (req: any,res) => {
    res.json(req.user)
})
router.get('/user/confirmation', async (req, res) => {
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
