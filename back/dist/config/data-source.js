"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapsModel = exports.CredentialModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Maps_1 = require("../entities/Maps");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: envs_1.DB_HOST || "ievg.online",
    port: 3306,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: true,
    //dropSchema: false,                       //vacia nuestra base de datos
    logging: false, //indica todas las peticiones realizadas en la terminal del back
    entities: [User_1.User, Credential_1.Credential, Maps_1.Maps],
    subscribers: [],
    migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User); //get repository se utiliza para acceder a una entidad. nos proporciona varios metodos para realizar operacinoes CRUD sobre los
exports.CredentialModel = exports.AppDataSource.getRepository(Credential_1.Credential); //registros de la base de datos correspondientres a esa entidad
exports.MapsModel = exports.AppDataSource.getRepository(Maps_1.Maps);
