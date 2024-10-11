"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET); // Cambia a IAuthUser
        console.log("verified:", verified);
        req.user = verified; // Asigna el usuario verificado a req.user
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
exports.default = authMiddleware;
