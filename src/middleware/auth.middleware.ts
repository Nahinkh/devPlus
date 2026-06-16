import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import envConfig from "../config/dotEnv.config";

export const auth = (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.accessToken as string || req.cookies.accessToken;
        if (!token) {
            throw new Error("No token provided | Unauthorized");
        }
        const decoded = jwt.verify(token, envConfig.jwt_secret!) as JwtPayload;
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized: Invalid token.",
        });
    }
}