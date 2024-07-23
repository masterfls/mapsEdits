import { NextFunction, Request, Response } from "express";
import { Credential } from "../entities/Credential";
const jwt = require('jsonwebtoken');


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    // Obtener el token de los encabezados de la solicitud
    const {id, username, password}: Credential = req.body
    console.log(req.query)
    const token = req.headers['authorization'];
    console.log(token)
    
    // Si no hay token, responder con un código de estado 403 (Forbidden)
    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
  
    // Verificar el token
    jwt.verify(token.split(' ')[1], 'your_secret_key', (err:Error, decoded: object) => {
      // Si hay un error en la verificación, responder con un código de estado 500 (Internal Server Error)
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
  
      // Si el token es válido, extraer el ID del usuario del token decodificado y añadirlo a la solicitud
    
    //   req.userId = decoded.id;
      // Pasar al siguiente middleware o ruta
      next();
    });
  }
  