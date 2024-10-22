import { Request, Response, NextFunction } from 'express';
import {ACCESS_TOKEN_SECRET} from '../config/envs'
const jwt =  require('jsonwebtoken');

interface AuthRequest extends Request {
    user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader  = req.header('Authorization') 

    if (!authHeader ) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Access denied, token missing' });
    }
    try {
      const verified = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET as string);
        console.log("verified:", verified)
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;




