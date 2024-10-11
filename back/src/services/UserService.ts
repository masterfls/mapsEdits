import dotenv from 'dotenv'; // Importar dotenv
dotenv.config({ path: '../../.env' }); // Cargar las variables de entorno
import { User } from "../entities/User";
import { CredentialModel, UserModel } from "../config/data-source";
import { Credential } from "../entities/Credential";
import { createCredential, credentialsDelete, searchCredential } from "./CredentialService";
import IUserdto from "../DTO/userdto";
import ICredential from "../DTO/credentialdto";
import mailjet from 'node-mailjet';
import { v4 as uuidv4 } from 'uuid';

console.log('MJ_APIKEY_PUBLIC:', process.env.MJ_APIKEY_PUBLIC);
console.log('MJ_APIKEY_PRIVATE:', process.env.MJ_APIKEY_PRIVATE);

// Claves de API de Mailjet
const mailjetClient = new mailjet.Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC, // Asegúrate de que estas claves estén en tus variables de entorno
  apiSecret: process.env.MJ_APIKEY_PRIVATE
});


// Funciones de servicio
const UserService = async (): Promise<User[]> => {
  const users = await UserModel.find();
  return users;
};

const returnUser = async (id: number): Promise<object | null> => {
  const user = await UserModel.findOneBy({ id });
  const credentials: Credential | null = await CredentialModel.findOneBy({ id });
  const username = credentials?.username;

  return { user, username };
};

const UserRole = async (): Promise<User[]> => {
  const disabled: "disabled" = "disabled";
  const users = await UserModel.find({ where: { rol: disabled } });
  return users;
};

const userRole = async (id: number, rol: "user" | "admin") => {
  const user: User | null = await UserModel.findOneBy({ id });
  if (user) {
    user.rol = rol;
    await UserModel.save(user);
    return user;
  } else {
    console.log("no se encontró el usuario");
    return null;
  }
};

const userDelete = async (id: number) => {
  const user = await UserModel.delete({ id });
  await credentialsDelete(id);
  if (user.affected === 0) {
    console.log("no se encontró el usuario");
  } else {
    console.log("usuario eliminado");
  }
};

const validateUser = async (email: string, username: string): Promise<boolean> => {
  const dataemail = await UserModel.findOneBy({ email });
  const datausername = await CredentialModel.findOneBy({ username });
  return !!(dataemail || datausername);
};

const createUser = async (userData: IUserdto) => {
  const email: string = userData.email;
  const username: string = userData.username;
  const validation: boolean = await validateUser(email, username);

  if (validation) {
    return null; // El usuario ya existe
  } else {
    const newUser = await UserModel.create(userData);
    const newCredential = await createCredential({
      username: userData.username,
      password: userData.password
    });

    newUser.credential = newCredential;
    newUser.confirmationToken = uuidv4();
    await UserModel.save(newUser);
    return newUser;
  }
};

const loginUser = async (Credentials: ICredential) => {
  const userExist = await searchCredential(Credentials);
  if (userExist) {
    console.log("token generado: ", userExist);
  }
};

const sendConfirmationEmail = async (to: string, subject: string, text: string) => {
  try {
    const request = await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "tu_email@ejemplo.com",
            Name: "Tu Nombre"
          },
          To: [
            {
              Email: to,
              Name: "Nombre del destinatario"
            }
          ],
          Subject: subject,
          TextPart: text,
        }
      ]
    });
    console.log(request.body);
  } catch (err) {
    console.error(err);
  }
};

const confirmEmail = async (token: string) => {
  const user = await UserModel.findOne({ where: { confirmationToken: token } });

  if (!user) {
    throw new Error('Invalid or expired token');
  }

  user.status = 'active';
  user.confirmationToken = null;
  await UserModel.save(user);

  return user;
};

// Exportar las funciones
export {
  createUser,
  returnUser,
  UserService,
  loginUser,
  sendConfirmationEmail,
  UserRole,
  userDelete,
  userRole,
  confirmEmail,
};
