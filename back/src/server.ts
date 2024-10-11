import express  from "express";    //me traigo la libreria express que me servira para crear mi servidor
import cors from "cors";
import morgan from "morgan";
import router from "./router/index"

const app = express();          //creo mi servidor en la constante app


app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: 'https://ievg.online', // Permitir solicitudes desde el dominio de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(router)         //tengo el servidor, el enrutador, se hace la peticion y en esta linea lego hacia donde ira la solicitud, en este caso al anrutador

export default app;