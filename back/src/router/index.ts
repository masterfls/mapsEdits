import { Router } from "express";       //me traigo el metodo Router de express, este metodo se utiliza para manejar rutas
import routerMaps from "./routerMaps";
import routerUser from "./routerUser";

const router: Router = Router();            // creo mi enrutador

router.use("/", routerUser)
router.use("/", routerMaps);

export default router;