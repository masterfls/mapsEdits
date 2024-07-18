import { User } from "../entities/User";
import { UserModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import { createCredential, searchCredential } from "./CredentialService";
import IUserdto from "../DTO/userdto";
import ICredential from "../DTO/credentialdto";

export const UserService = async (): Promise<User[]> => {
    const user = await UserModel.find();    //accedo a la tabla User de la DB y me traigo todo lo que hay con el metodo find
    return user                 
}

export const returnUser = async(id: number): Promise<User | null> => {
    const user = await UserModel.findOneBy({id})    //me traigo de la tabla User de la DB al primer registro que coincida con el id recibido por parametros
    return user;
}

export const createUser = async (userData: IUserdto) => {
    const User = await UserModel.create(userData)   //creo el registro en la DB

    const newCredential = await createCredential({
        username: userData.username,
        password: userData.password
      });    //accedemos a la funcion createCredential para crear la credencial
        
    User.credential = newCredential;        
    await UserModel.save(User)      //guardamos el registro del usuario creado junto con las credenciales en la DB
    return User
}

export const loginUser = async (Credentials: ICredential) => {
    const userExist: number = await searchCredential(Credentials)
    if(userExist) return true
}