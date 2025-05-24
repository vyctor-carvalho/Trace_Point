import { sign, verify } from "jsonwebtoken";

import { UserRole } from "../models/enum/UserRole";
import { JWT_SECRET, REFRESH_SECRET, TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from "../config/EsportEnv"
import { HttpException } from "../error/HttpException";

export interface TokenPayload{
    id: string;
    role: UserRole;
    email: string;
}

export class TokenManager {

    public geneareAccessToken(payload: TokenPayload) {
        return sign(
            payload, 
            JWT_SECRET, 
            {
                expiresIn: TOKEN_EXPIRES_IN
            }
        );
    }

    public generateRefreshToken(payload: TokenPayload) {
        return sign(
            payload,
            REFRESH_SECRET,
            {
                expiresIn: REFRESH_TOKEN_EXPIRES_IN
            }
        );
    }

    public verifyAccessToken(token: string) {
        try {
            return verify(
                token,
                JWT_SECRET            
            ) as TokenPayload;
        } catch(error: any) {
            throw new HttpException(401, "Invalid or expired access token");
        }
    }

    public verifyRefreshToken(token: string) {
        try {
            return verify(
                token,
                REFRESH_SECRET
            ) as TokenPayload;
        } catch (error: any) {
            throw new HttpException(401, "Invalid or expired refresh token");
        }
    }

}