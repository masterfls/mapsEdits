import { Request, Response } from "express";
import { Maps } from "../entities/Maps";
import IMaps from "../DTO/mapsdto";
import { MapsModel, UserModel } from "../config/data-source";
import { User } from "../entities/User";

const arrayPolyline: IMaps[] = [];

export const savePolyline = async (data: IMaps): Promise<Maps> => {
    const user: User | null = await UserModel.findOneBy({id: data.userId})      //busco al usuario por su id
    if (!user) {                                                                //verifico si el usuario existe
        throw Error("Usuario Inexistente")                       
    }
    const newPolyline: Maps = await MapsModel.create(data);
    newPolyline.user = user;                                                    //asigno en polyline.user el usuario encontrado
    await MapsModel.save(newPolyline)
    return newPolyline;
}

export const polylineGet = async (): Promise<Maps[]> => {
    const maps = await MapsModel.find();    //accedo a la tabla Mpas de la DB y me traigo todo lo que hay con el metodo find
    return maps                 
}

