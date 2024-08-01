import { Request, Response } from "express";
import { deleteLinea, polylineGet, savePolyline } from "../services/mapService";
import { Maps } from "../entities/Maps";

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

export const deletePolyline = async(req: Request, res: Response) =>{ 
    try {
        const id = req.query.id;
        await deleteLinea(Number(id));
        //  res.status(201).json("aqui se mostrara datos geoespaciales de las polilineas");
        
    } catch (error) {
        res.status(400).json({error: "Error al eliminar la linea seleccionada"})
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
        console.log("lineas: ", lineas)
        res.status(200).json(lineas);
    } catch (error) {
        res.status(400).json({error: "Error al obtener las lineas"})
    }
}