import { Request, Response } from "express";
import { polylineGet, savePolyline } from "../services/mapService";
import { Maps } from "../entities/Maps";
import IMaps from "../DTO/mapsdto";

export const getPolyline = async(req: Request, res: Response) =>{ 
    try {
        const linea = req.body;
        const id = linea.id 
        const savelinea = await savePolyline(linea, id);
        res.status(201).json(savelinea);
        // res.status(200).json("aqui se mostrara datos geoespaciales de las polilineas");
        
    } catch (error) {
        res.status(400).json({error: "Error al obtener los usuarios"})
    }
}

export const getPolylineId = async (req: Request, res: Response) => {
    try {
        res.status(200).json("aqui se mostrara datos geoespaciales de una polyline especificada por id");
        } catch (error) {
            res.status(400).json({error: "Error al obtener los usuarios"})
        }
}

export const polylines = async(req: Request, res: Response) =>{
    try {
        const id = req.query.id;
        const lineas: Maps[] = await polylineGet(Number(id))
        console.log("linea posicion 0: ", lineas[0])
        res.status(200).json(lineas);
    } catch (error) {
        res.status(400).json({error: "Error al obtener las lineas"})
    }
}