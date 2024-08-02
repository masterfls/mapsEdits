import { Request, Response } from "express";
import { Maps } from "../entities/Maps";
import IMaps from "../DTO/mapsdto";
import { MapsModel, UserModel } from "../config/data-source";
import { User } from "../entities/User";

export const savePolyline = async (data: IMaps): Promise<Maps> => {
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



//estoy bastante drodago por lo que me voy a acostar. recordar para mañana. por alguna extraña razon el universo no quiere que todas las lineas sean guardadas, de hecho cuando se guarda una linea se borra otra.
//es como si esa fuese la capacidad, aunque ahora que lo pienso el problema parece obvio. si una linea se muestra y otra linea se borra, es facil saber el motivo. se esta sobreescribiendo.
//deberia caluclar, tal vez lo haga ahora y la lineas que se van borrando son las primeras que se han creado y no las ultimas.
//estuve expermientando con algunas funciones como la de arriba 'allpolylines' esa funcion accede a la base de datos y me muestra todas las lineas que hay ahi, no lo se, talvez veia algo importante qsyo.
//lo unico que creo es que hay efectivamente un problema al guardar, no al leer. eso es importante. el problema no parece tener que ver con el token. pero si es verdad que antes no pasaba, sin importar que tan rapido lo hacia
//otra cosa importante si me llego a trabar es esa. en git no pushe el update del dia de hoy asiq podria ver que cambia en la funcion que me guarda y muestra todas las lineas
//que no se saltea ninguna con esta funcion que me muestra las lineas dependiendo del id pero se saltea algunas.
//bueno creo que ya estaria hecha una notita por si me olvido donde quede. es una buena practica en los programadores hacer esto. ha y no te olvides de apagar el server ja. 
//no tengo ganas de iniciar con un problema de novatos xd. 