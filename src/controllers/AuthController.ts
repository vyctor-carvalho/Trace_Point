import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { LoginInfoDTO } from "../DTO/wrappersDTO/LoginInfoDTO";
import { AuthService } from "../service/AuthService"
import { HttpException } from "../error/HttpException";
import { console } from "inspector";

export class AuthController {

    private authService = new AuthService();

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginDTO = plainToInstance(LoginInfoDTO, req.body);

            const { accessToken, refreshToken, user } = await this.authService.authenticate(loginDTO);

            return res.status(200).json({
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.getEmail(),
                    role: user.role
                }
            });

        } catch (error) {
            next(error);
        }
    }       

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                throw new HttpException(400, "Refresh token required");
            }

            const accessToken = await this.authService.refreshAuthenticate(refreshToken);

            return res.status(200).json({ accessToken });

        } catch (error) {
            next(error);
        }

    }

}