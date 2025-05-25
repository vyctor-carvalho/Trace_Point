import { Request, Response, NextFunction } from "express";
import {  } from "jsonwebtoken";

import { JWT_SECRET } from "../config/EsportEnv";
import { HttpException } from "../error/HttpException";
import { TokenManager } from "../utils/TokenManager";

const tokenManager = new TokenManager();

export default function jwtRequired(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new HttpException(401, "Token is necessary");
    }

    if (!authHeader?.startsWith("Bearer ")) {
        throw new HttpException(401, "Token not provided");
    }

    const token = authHeader.split(" ")[1];

    const decoded = tokenManager.verifyAccessToken(token);

    req.user = decoded;
    
    next();

}