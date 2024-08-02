import { User } from "../entities/User";
import { CredentialModel, UserModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import { createCredential, searchCredential } from "./CredentialService";
import IUserdto from "../DTO/userdto";
import ICredential from "../DTO/credentialdto";
import Mailjet from 'node-mailjet'
import {MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC} from '../config/envs'
import {v4 as uuidv4} from 'uuid'


export const UserService = async (): Promise<User[]> => {
    const user = await UserModel.find();    //accedo a la tabla User de la DB y me traigo todo lo que hay con el metodo find
    return user                 
}

export const returnUser = async(id: number): Promise<object | null> => {
    const user = await UserModel.findOneBy({id})    //me traigo de la tabla User de la DB al primer registro que coincida con el id recibido por parametros
    const credentials: Credential | null = await CredentialModel.findOneBy({id: id})
    const username = credentials?.username

    return {user, username}
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
        return null
     }else{
        const User = await UserModel.create(userData)   //creo el registro en la DB
        
        const newCredential = await createCredential({
            username: userData.username,
            password: userData.password
          });    //accedemos a la funcion createCredential para crear la credencial

            User.credential = newCredential;    
            User.confirmationToken = uuidv4(); //genera un token unico    
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


export const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC as string,
    process.env.MJ_APIKEY_PRIVATE as string
);

export const sendConfirmationEmail = async (toEmail: string, confirmationLink: string) => {                 //funcion que se encarga de mandar el mail al usuario
    const request = mailjet
        .post("send", { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "fernandeztomas735@gmail.com",
                        Name: "-MapsEdits-"
                    },
                    To: [
                        {
                            Email: toEmail,
                            Name: "Recipient Name"
                        }
                    ],
                    Subject: "Please confirm your email address",
                    TextPart: `Please click the following link to confirm your email address: ${confirmationLink}`,
                    HTMLPart: `<h3>Please click the following link to confirm your email address:</h3><a href="${confirmationLink}">Confirm Email</a>`
                }
            ]
        });

    try {
        const response = await request;
        return response.body;
    } catch (err) {
        console.error(err);
        throw new Error('Error sending email');
    }
};


export const confirmEmail = async (token: string) => {                          //funcion que valida el mail una vez que el usuario lo valida
    const user = await UserModel.findOne({ where: { confirmationToken: token } });

    if (!user) {
        throw new Error('Invalid or expired token');
    }

    user.status = 'active'; // Cambiar el estado del usuario a activo
    user.confirmationToken = null
    await UserModel.save(user);

    return user;
};