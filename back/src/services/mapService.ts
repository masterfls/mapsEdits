import { Maps } from "../entities/Maps";
import IMaps from "../DTO/mapsdto";
import { MapsModel, UserModel } from "../config/data-source";
import { User } from "../entities/User";

export const savePolyline = async (data: IMaps): Promise<Maps> => {
    console.log("dentro de savePolyline")
    // Busca al usuario por su ID
    const user: User | null = await UserModel.findOneBy({id: data.userId}) 
    if (!user) {
        throw new Error("Usuario Inexistente");
    }
    // Crea una nueva línea
    const newPolyline = MapsModel.create({
        coordenadas: data.coordenadas,
        estilos: data.estilos,
        user: user,
    });

    // Guarda la nueva línea en la base de datos
    await MapsModel.save(newPolyline);
    
    return newPolyline;
};



export const polylineGet = async (id: number): Promise<Maps[]> => {
    console.log("hola")
    const maps = await MapsModel.find({
        where: {user: {id: id }}
    });    //accedo a la tabla Mpas de la DB y me traigo todo lo que hay con el metodo find
    return maps              
}

export const deleteLinea = async (id: number) => {
    const line = await MapsModel.find({
        where: {id: id}
    });    //accedo a la tabla Mpas de la DB y me traigo todo lo que hay con el metodo find
    const del = await MapsModel.delete(id)  
    return       
}
