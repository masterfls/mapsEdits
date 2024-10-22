//en esta carpeta se realiza la configuracion a la base de datos utilizando postgreSQL
//IMPORTANTE: ANTES DE FINALIZAR EL PROYECTO, DEBO VERIFICAR VARIAS COSAS: 
//1) CONFIGURAR .ENV Y VARIOS ARCHIVOS DE LA BASE DE DATOS QUE NECESITO PONERLOS AHI.
// 1) para guardar la informacion de los edits que realiza el usuario en el maps, se guardan como datos geoespaciales

import dotenv from 'dotenv'; // Importar dotenv
dotenv.config({ path: '../../.env' }); // Cargar las variables de entorno


export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_TYPE = process.env.DB_TYPE;
export const PORT = process.env.PORT;
export const MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC;
export const MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const PATH = process.env.PATH

// console.log(`DB_NAME: ${DB_NAME}`);
// console.log(`DB_HOST: ${DB_HOST}`);
// console.log(`DB_PORT: ${DB_PORT}`);
// console.log(`DB_USERNAME: ${DB_USERNAME}`);
// console.log(`DB_PASSWORD: ${DB_PASSWORD}`);
// console.log(`DB_TYPE: ${DB_TYPE}`);
// console.log(`PORT: ${PORT}`);
// console.log(`MJ_APIKEY_PUBLIC: ${MJ_APIKEY_PUBLIC}`);
// console.log(`MJ_APIKEY_PRIVATE: ${MJ_APIKEY_PRIVATE}`);
// console.log(`ACCESS_TOKEN_SECRET: ${ACCESS_TOKEN_SECRET}`);
// console.log(`PATH: ${PATH}`);
