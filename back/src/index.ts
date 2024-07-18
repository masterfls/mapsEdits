import "reflect-metadata";
import app from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(res => {
    console.log("conexion a la base de datos realizada con exito");
    app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${PORT}`)
    })
})