import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import ICredential from "../DTO/credentialdto";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



export const createCredential = async (credentialData: ICredential): Promise<Credential> => {
    //codificacion de las credenciales antes de guardarlas
    const salt = bcrypt.genSaltSync(10)      //genera una sal (string aleatorio que se añade a la contraseña), el parametro 10 determina la complejidad y el tiempo que tomara generar la sal
    const hashedPassword = bcrypt.hashSync(credentialData.password, salt)   //codificacion de la contraseña, toma la contraseña proporcionada por el usuario y la sal generada anteriormente, y devuelve la contraseña codificada

    const newCredential = await CredentialModel.create({                //accedo a la entidad y con el metodo create creo una nueva credencial con los datos recibidos por parametros
        ...credentialData,
        password: hashedPassword
    }); 
    await CredentialModel.save(newCredential)   //guardo esas credenciales con el metodo save en la base de datos
    return newCredential    //retorno el par de credenciales creada
    

}


export const searchCredential = async (searchData: ICredential) => {
    const userId: Credential | null = await CredentialModel.findOneBy({username: searchData.username}) //uso el metodo finOneBy para obtener el registro en la tabala de la base de datos que coincida en el username brindado (en caso de existir)
    if (userId){
        const passwordIsValid = bcrypt.compareSync(searchData.password, userId.password)
        if (passwordIsValid){
            const token = jwt.sign({ id: userId.id }, 'your_secret_key', { expiresIn: '1h' });        //generacion del token
            return token
        }else{
            return false
        }

    }else{                                      //si no existe significa que las credenciales no existe por lo que el usuario no existe o las ingreso mal
        throw new Error("Credenciales Not Found")
    }
}

export const credentialsDelete = async(id:number) => {
    const credential = await CredentialModel.delete({id:id})
    if (credential.affected === 0) {
        console.log("no se encontraron las credenciales del usuario especificado")
    } else {
        console.log("credenciales eliminadas")
    }
}
