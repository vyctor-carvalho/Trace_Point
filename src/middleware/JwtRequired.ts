import { Request, Response, NextFunction } from "express";
import {  } from "jsonwebtoken";

import { JWT_SECRET } from "../config/EsportEnv";
import { HttpException } from "../error/HttpException";
import { TokenManager } from "../utils/TokenManager";

/**
 * @function jwtRequired
 * @description Middleware Express para proteger rotas, exigindo um token JWT válido.
 * Este middleware inspeciona o cabeçalho 'Authorization' da requisição em busca de um token no formato 'Bearer [token]'.
 * Se um token válido for encontrado e verificado com sucesso usando a instância de `TokenManager`.
 *
 * Caso o cabeçalho 'Authorization' esteja ausente, não comece com 'Bearer ', o token em si esteja faltando após 'Bearer ',
 * ou se o token for considerado inválido pela verificação do `tokenManager.verifyAccessToken()`,
 * uma `HttpException` com status 401 (Não Autorizado) é lançada.
 *
 * @param {Request} req - O objeto de requisição Express. O cabeçalho `Authorization` será lido deste objeto.
 * @param {Response} res - O objeto de resposta Express. Este middleware não envia uma resposta diretamente,
 * mas pode influenciar o fluxo que leva a uma resposta (ou a um erro).
 * @param {NextFunction} next - A função callback para invocar o próximo middleware na pilha de execução.
 * É chamada sem argumentos se a autenticação do token for bem-sucedida,
 * permitindo que a requisição prossiga.
 */
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