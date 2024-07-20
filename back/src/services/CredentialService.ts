import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import ICredential from "../DTO/credentialdto";

export const createCredential = async (credentialData: ICredential): Promise<Credential> => {
        const newCredential = await CredentialModel.create(credentialData); //accedo a la entidad y con el metodo create creo una nueva credencial con los datos recibidos por parametros
        await CredentialModel.save(newCredential)   //guardo esas credenciales con el metodo save en la base de datos
        return newCredential    //retorno el par de credenciales creada

}


export const searchCredential = async (searchData: ICredential): Promise<number> => {
    const userId: Credential | null = await CredentialModel.findOneBy({username: searchData.username}) //uso el metodo finOneBy para obtener el registro en la tabala de la base de datos que coincida en el username brindado (en caso de existir)
    if (!userId) {              //si no existe significa que las credenciales no existe por lo que el usuario no existe o las ingreso mal
        throw Error("Credenciales Not Found")
    } else if (userId.password !== searchData.password){
        throw Error("Password Incorrect")   //si el usuario existe pero la contraseña es incorrecta, el usuario si existe, esta mal la contraseña
    }else{
        return userId.id;   //en caso de que todo sea correcto retorno el id que referencia el par credenciales
    }
}