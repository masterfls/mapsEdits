import { Request, Response, NextFunction } from 'express';
const jwt =  require('jsonwebtoken');

interface AuthRequest extends Request {
    user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    try {
      const verified = jwt.verify(token, 'your_secret_key');
      console.log(verified)
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;




