import { User } from "../entities/User";
import { CredentialModel, UserModel } from "../config/data-source";
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

const validateUser = async(email: string, username: string): Promise<boolean> => {
    const dataemail = await UserModel.findOneBy({email: email})
    const datausername = await CredentialModel.findOneBy({username: username})
    if (dataemail || datausername) {
        return true
    }else{
        return false
    }
}

export const createUser = async (userData: IUserdto) => {
    const email: string = userData.email
    const username: string = userData.username
    const validation: boolean = await validateUser(email, username)
    
     if (validation){                                           //valido el mail del usuario que se esta registrando
        console.log(validation)
        return null
     }else{
        const User = await UserModel.create(userData)   //creo el registro en la DB
        const newCredential = await createCredential({
            username: userData.username,
            password: userData.password
          });    //accedemos a la funcion createCredential para crear la credencial

            User.credential = newCredential;        
            await UserModel.save(User)      //guardamos el registro del usuario creado junto con las credenciales en la DB
            return User
            
     }
  
}

export const loginUser = async (Credentials: ICredential) => {
    const userExist = await searchCredential(Credentials)
    if(userExist) {
        console.log("token generado: ", userExist)
    }
}