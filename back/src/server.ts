// necesito comunicarme con mi DB. para generar un nuevo usuario (mas adelante para editar un usuario existente e eliminar)
// obtener datos de los usuarios creados, verificar informacion para permitir acceso
// pasos:
// 1) crear servidor y poner en escucha
// 2) ir creando las 3 carpetas principales que se encargaran de las peticiones y respuestas


import  express  from "express";    //me traigo la libreria express que me servira para crear mi servidor
import cors from "cors";
import morgan from "morgan";
import router from "./router/index"

const app = express();          //creo mi servidor en la constante app


app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(router)         //tengo el servidor, el enrutador, se hace la peticion y en esta linea lego hacia donde ira la solicitud, en este caso al anrutador

export default app;