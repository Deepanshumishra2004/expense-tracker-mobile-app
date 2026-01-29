import type { NextFunction, Response, Request } from "express"
import ratelimit from "../config/upstash.js"

const rateLimiter =async(req : Request,res : Response,next : NextFunction)=>{
    try {
        const key = req.ip ?? "anonymous";
        const { success } = await ratelimit.limit(key);

        if(!success){
            return res.status(401).json({
                message : "To many requests, please try again later."
            })
        }
        next();
    } catch (e) {
        console.log("Rate limit error : ",e);
        next(e);
    }
}

export default rateLimiter;