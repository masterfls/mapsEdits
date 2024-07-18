import { Request, Response } from "express";
import { User } from "../entities/User";
import { createUser, returnUser, UserService, loginUser } from "../services/UserService";
import IUserdto from "../DTO/userdto";
import ICredential from "../DTO/credentialdto";

export const getUsers = async(req: Request, res: Response) =>{
    try {
        const user: User[] = await UserService()
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: "Error al obtener los usuarios"})
    }
}

export const getUsersId = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params
        const userId: User | null = await returnUser(Number(id))
        res.status(200).json(userId);
    } catch (error) {
        res.status(400).json({error: "error al obtener el usuario"})
    }
}


export const register = async(req: Request, res: Response) =>{
    try {
        const { name, email, birthdate, nDni, username, password }: IUserdto = req.body
        const newUser: User = await createUser({ name, email, birthdate, nDni, username, password  }) 
        res.status(200).json(newUser);
        
    } catch (error: any) {
        res.status(400).json({error: error.message})
    }
    
}

export const loginUsers = async(req: Request, res: Response) =>{
    try {
        const { username, password }: ICredential = req.body
        const userExist = await loginUser({ username, password })
        if (userExist){
            return res.status(200).json({message: "User Logged"})
        }
        throw new Error("Credenciales incorrectas, usuario no logueado")

    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}