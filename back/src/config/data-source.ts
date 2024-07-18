import { DataSource } from "typeorm"
// import { User } from "../entities/User"
// import { Credential } from "../entities/Credential"
// import { Maps } from "../entities/Maps
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } from "./envs"


export  const  AppDataSource  =  new  DataSource ( { 
    type : "postgres", 
    host : DB_HOST || "localhost", 
    port : 5432, 
    username : DB_USERNAME, 
    password : DB_PASSWORD, 
    database : DB_NAME, 
    synchronize : true, 
    // dropSchema: true,                       //vacia nuestra base de datos
    logging : true, 
    // entities : [ User, Credential, Maps] , 
    subscribers : [ ], 
    migrations : [ ], 
} )