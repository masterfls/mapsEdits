import dotenv from 'dotenv'; // Importar dotenv
dotenv.config(); // Cargar el archivo .env
import "reflect-metadata";
import app from "./server";
import {PORT} from "./config/envs";
import { AppDataSource } from "./config/data-source";

// Cargar las variables de entorno desde .env
console.log("MJ_APIKEY_PUBLIC:", process.env.MJ_APIKEY_PUBLIC);  // Debe mostrar tu API Key
console.log("MJ_APIKEY_PRIVATE:", process.env.MJ_APIKEY_PRIVATE);  // Debe mostrar tu API Secret

AppDataSource.initialize()
.then(res => {
    console.log("conexion a la base de datos realizada con exito");
    app.listen(PORT,() => {
    console.log(`servidor escuchando en el puerto ${PORT}`)
    })
})
 .catch(error => console.log("Error al inicializar la base de datos:", error));