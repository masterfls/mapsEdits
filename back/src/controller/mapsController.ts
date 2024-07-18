import { Request, Response } from "express";
import { savePolyline } from "../services/mapService";

export const getPolyline = async(req: Request, res: Response) =>{
    try {
        const linea = req.body;
        const savelinea = await savePolyline(linea);
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