import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { LoginInfoDTO } from "../DTO/wrappersDTO/LoginInfoDTO";
import { AuthService } from "../service/AuthService"

/**
 * @class AuthController
 * @description Controller responsável por lidar com requisições de autenticação, como login e refresh de token.
 */
export class AuthController {

    private authService = new AuthService();

    /**
     * @method login
     * Realiza o login de um usuário.
     * Recebe credenciais de login (email e senha) no corpo da requisição,
     * autentica o usuário e retorna tokens de acesso e atualização,
     * juntamente com informações básicas do usuário.
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o LoginInfoDTO no corpo.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo os tokens e dados do usuário,
     * ou chama `next` com um erro em caso de falha.
     */
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

    /**
     * @method refreshToken
     * Atualiza o token de acesso de um usuário utilizando um refresh token.
     * Recebe um refresh token no corpo da requisição e, se válido,
     * retorna um novo token de acesso.
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o refreshToken no corpo.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o novo accessToken,
     * ou chama `next` com um erro em caso de falha ou token inválido.
     */
    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;

            const accessToken = await this.authService.refreshAuthenticate(refreshToken);

            return res.status(200).json({ accessToken });

        } catch (error) {
            next(error);
        }
    }
}