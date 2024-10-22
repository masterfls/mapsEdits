import { register, getUsers, getUsersId, loginUsers, getdisabled, rolcontroller, deleteUser } from "../controller/usersController";
import authMiddleware from "../middleware/tokenvalidate";
import { confirmEmail } from "../services/UserService";
import { deletePolyline, getPolyline, getPolylineId, polylines } from "../controller/mapsController";
import { Router } from "express";       //me traigo el metodo Router de express, este metodo se utiliza para manejar rutas


const router: Router = Router();            // creo mi enrutador

//rutes of users
router.get("/users/test", (req, res) => {
    res.send("Test route is working");
});
router.get("/users/get", getUsers);
router.get("/users/id", getUsersId);
router.post("/users/register", register)
router.post("/users/login", loginUsers)
router.get("/users/disabled", getdisabled)
router.put("/users/update", rolcontroller)
router.delete("/users/delete", deleteUser)

router.get('/users/validate/token', authMiddleware, (req: any,res) => {
    res.json(req.user)
})
router.get('/users/confirmation', async (req, res) => {
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


//rutes of maps
router.post("/post", getPolyline, authMiddleware, (req: any,res) => {
    res.json(req.user.id)
});
router.get("/api/lineas/get", polylines)
router.get("/api/lineas/:id", getPolylineId);
router.delete("/api/lineas/delete", deletePolyline)


export default router;
