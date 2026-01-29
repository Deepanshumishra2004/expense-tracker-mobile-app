import type { NextFunction, Response, Request } from "express"
import Jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
    userId? : string,
    email? : string,
    username? : string
}

interface Auth_Jwt_payload extends JwtPayload {
    userId : string,
    email : string,
    username : string
}

export const AuthMiddleware =(req : AuthRequest,res : Response,next : NextFunction)=>{

    const token = req.headers.authorization?.split(' ')[1] as string;

    if(!token) res.status(401).json({ message : "token doesn't exist" })

    try {
        const decoded = Jwt.verify(token, JWT_SECRET) as Auth_Jwt_payload;
        req.userId = decoded.userId;
        req.username = decoded.username;
        req.email = decoded.email;
        next();
    } catch (error) {
        res.status(401).json({ message : "authenication fails" })
    }
}