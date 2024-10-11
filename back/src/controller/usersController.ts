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
        res.status(200).json({ message: "Rol de usuario modificado" });
    } catch (error) {
        console.error({error: "error al modificar rol del usuario"})
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    try {
        const id = req.query.id
        const user = await userDelete(Number(id))
        console.log("usuario eliminado de la base de datos")
        res.status(200).json({ message: "User Delete" });
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


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, nDni, username, password }: IUserdto = req.body;
        const newUser: User | null = await createUser({ name, email, birthdate, nDni, username, password });
        
        if (newUser == null) {
            return res.status(400).json({ message: "Registro fallido" });
        } else {
            // Genera el enlace de confirmación
            const confirmationLink = `https://ievg.online/users/confirmation?token=${newUser.confirmationToken}`;
            // Crea el texto del mensaje
            const text = `Por favor, confirma tu cuenta haciendo clic en el siguiente enlace: ${confirmationLink}`;
            // Envía el correo de confirmación
            await sendConfirmationEmail(newUser.email, "Confirma tu cuenta", text);
            console.log('User registered. Please check your email to confirm your account.');
            res.status(200).json(false); // Indica que el usuario fue creado exitosamente.
        }
    } catch (error) {
    
        console.error(error);
        res.status(400).json({ error: "Error al obtener los usuarios" });
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