import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 
import { IAuthUser } from '../types'; // Asegúrate de ajustar la ruta según tu estructura

interface AuthRequest extends Request {
    user?: IAuthUser; // Usa IAuthUser aquí
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }
    
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as IAuthUser; // Cambia a IAuthUser
        console.log("verified:", verified);
        req.user = verified; // Asigna el usuario verificado a req.user
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
