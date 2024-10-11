import { Router, Request, Response } from "express";
import { register, getUsers, getUsersId, loginUsers, getdisabled, rolcontroller, deleteUser } from "../controller/usersController";
import authMiddleware from "../middleware/tokenvalidate";
import { confirmEmail } from "../services/UserService";
import { IAuthUser } from '../types'; // Asegúrate de que la ruta sea correcta

const router: Router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.send("Test route is working");
});

router.get("/get", getUsers);
router.get("/id", getUsersId);
router.post("/register", register);
router.post("/login", loginUsers);
router.get("/disabled", getdisabled);
router.put("/update", rolcontroller);
router.delete("/delete", deleteUser);

// Actualiza la ruta de validación de token con el tipo AuthRequest
router.get('/validate/token', authMiddleware, (req: Request & { user?: IAuthUser }, res: Response) => {
    res.json(req.user);
});

router.get('/confirmation', async (req: Request, res: Response) => {
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
