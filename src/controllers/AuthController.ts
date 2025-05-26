import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { LoginInfoDTO } from "../DTO/wrappersDTO/LoginInfoDTO";
import { AuthService } from "../service/AuthService"
import { HttpException } from "../error/HttpException";
import { console } from "inspector";

/**
 * @class AuthController
 * @description Controller responsável por lidar com requisições de autenticação, como login e refresh de token.
 */
export class AuthController {

    private authService = new AuthService();

    /**
     * @method login
     * @description Lida com a requisição de login de usuário.
     * Converte o corpo da requisição em um DTO de informações de login e chama o serviço de autenticação.
     * Retorna um accessToken, refreshToken e informações básicas do usuário em caso de sucesso.
     * Em caso de erro, passa o erro para o próximo middleware.
     * * @param {Request} req O objeto de requisição do Express.
     * @param {Response} res O objeto de resposta do Express.
     * @param {NextFunction} next A função para passar o controle para o próximo middleware.
     * @returns {Promise<Response>} Uma Promise que resolve para o objeto de resposta JSON contendo os tokens e as informações do usuário.
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
     * @description Lida com a requisição de refresh de token de acesso.
     * Espera um refreshToken no corpo da requisição para gerar um novo accessToken.
     * Retorna um novo accessToken em caso de sucesso.
     * Em caso de erro (ex: refreshToken não fornecido ou inválido), lança uma HttpException ou passa o erro para o próximo middleware.
     * * @param {Request} req O objeto de requisição do Express.
     * @param {Response} res O objeto de resposta do Express.
     * @param {NextFunction} next A função para passar o controle para o próximo middleware.
     * @returns {Promise<Response>} Uma Promise que resolve para o objeto de resposta JSON contendo o novo accessToken.
     */
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