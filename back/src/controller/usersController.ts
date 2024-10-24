import { Request, Response } from "express";
import { User } from "../entities/User";
import { createUser, returnUser, UserService, loginUser, sendConfirmationEmail, UserRole, userDelete, userRole } from "../services/UserService";
import IUserdto from "../DTO/userdto";
import ICredential from "../DTO/credentialdto";
import { searchCredential } from "../services/CredentialService";

export const getUsers = async(req: Request, res: Response) =>{
    try {
        const user: User[] = await UserService()
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: "Error al obtener los usuarios"})
    }
}

export const rolcontroller = async(req: Request, res: Response) => {
    try {
        const {id, role} = req.body
        const user = await userRole(id, role)
        console.log("Usuario modificado")
    } catch (error) {
        console.error({error: "error al modificar rol del usuario"})
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    try {
        const id = req.query.id
        const user = await userDelete(Number(id))
        console.log("usuario eliminado de la base de datos")
    } catch (error) {
        console.error({error: "error al eliminar usuario de la base de datos"})
    }
}


export const getdisabled = async(req: Request, res: Response) => {
    try {
        const user: User[] = await UserRole()
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: "Error al obtener usuarios"})
    }
}

export const getUsersId = async(req: Request, res: Response) =>{
    try {
        const id = req.query.id
        const userId = await returnUser(Number(id))
        res.status(200).json(userId);
    } catch (error) {
        res.status(400).json({error: "error al obtener el usuario"})
    }
}


export const register = async(req: Request, res: Response) =>{
    try {
        const { name, email, birthdate, nDni, username, password }: IUserdto = req.body
        const newUser: User | null = await createUser({ name, email, birthdate, nDni, username, password  }) 
        if (newUser == null){
            res.status(200).json(true)
        }else{
            const confirmationLink = `http://www.ievg.online/users/confirmation?token=${newUser.confirmationToken}`;
            await sendConfirmationEmail(newUser.email, confirmationLink)
            console.log('User registered. Please check your email to confirm your account.')
            res.status(200).json(false);
        }
  
    } catch (error: any) {
        console.log('Error registering user')
        res.status(400).json({error: error.message})
    }
    
}


export const loginUsers = async(req: Request, res: Response) =>{
    try {
        console.log("hola")
        const { username, password }: ICredential = req.body
        const token = await searchCredential({ username, password })
        if (token){
            return res.json({ token })
        }
        throw new Error("invalid credentials or user no logedd")

    } catch (error: any) {
        return res.status(400).json({message: "invalid credentials"})
    }
}
