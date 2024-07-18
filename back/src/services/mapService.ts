import { Request, Response } from "express";

const arrayPolyline: object[] = [];

export const savePolyline = async (data: object)=> {
    const linea = data
    arrayPolyline.push(linea)
    return arrayPolyline;
}