import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { Maps } from "../entities/Maps"
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
    logging : false,                            //indica todas las peticiones realizadas en la terminal del back
    entities : [ User, Credential, Maps], 
    subscribers : [ ], 
    migrations : [ ], 
} )

export const UserModel = AppDataSource.getRepository(User)   //get repository se utiliza para acceder a una entidad. nos proporciona varios metodos para realizar operacinoes CRUD sobre los
export const CredentialModel = AppDataSource.getRepository(Credential) //registros de la base de datos correspondientres a esa entidad
export const MapsModel = AppDataSource.getRepository(Maps)
