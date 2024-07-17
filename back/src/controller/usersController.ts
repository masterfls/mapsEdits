import { Request, Response } from "express";

export const getUsers = async(req: Request, res: Response) =>{
    try {
    res.status(200).json("aqui se mostrara la lista de usuarios");
    } catch (error) {
        res.status(400).json({error: "Error al obtener los usuarios"})
    }
}

export const getUsersId = async(req: Request, res: Response) =>{
    try {
        res.status(200).json("aqui se mostrara el usuario por id");
    } catch (error) {
        res.status(400).json({error: "error al obtener el usuario"})
    }
}


export const register = async(req: Request, res: Response) =>{
    try {
        res.status(200).json("aqui se podran registrar los usuarios");
        
    } catch (error: any) {
        res.status(400).json({error: error.message})
    }
    
}

export const loginUsers = async(req: Request, res: Response) =>{
    try {
           return res.status(200).json("aqui se podran loguear los usuarios")

    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}