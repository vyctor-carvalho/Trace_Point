import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

/**
 * Middleware de tratamento de erros para a aplicação Express.
 * Captura e padroniza a resposta para erros que ocorrem durante o processamento de requisições.
 *
 * @param {any} error - O objeto de erro capturado. Pode conter uma propriedade 'status'.
 * @param {Request} req - O objeto da requisição HTTP.
 * @param {Response} res - O objeto da resposta HTTP.
 * @param {NextFunction} next - A função de callback para o próximo middleware na cadeia.
 */
export const errorsHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error({
        error
    });

    res.status(error.status || 500).json({
        message: error.message || "Internal server error"
    });
}