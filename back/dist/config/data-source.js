"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
// import { User } from "../entities/User"
// import { Credential } from "../entities/Credential"
// import { Maps } from "../entities/Maps
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST || "localhost",
    port: 5432,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: true,
    // dropSchema: true,                       //vacia nuestra base de datos
    logging: true,
    // entities : [ User, Credential, Maps] , 
    subscribers: [],
    migrations: [],
});
