import dotenv from 'dotenv'; // Importar dotenv
dotenv.config(); // Cargar el archivo .env
import "reflect-metadata";
import app from "./server";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(res => {
    console.log("conexion a la base de datos realizada con exito");
})
 .catch(error => console.log("Error al inicializar la base de datos:", error));
