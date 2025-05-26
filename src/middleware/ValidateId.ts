import { Request, Response, NextFunction } from "express";
import { isUUID } from "class-validator";

import { HttpException } from "../error/HttpException";

/**
 * Middleware para validar se um parâmetro de rota é um UUID válido.
 *
 * @param {string} paramId - O nome do parâmetro na URL que contém o UUID a ser validado.
 * @returns {void} É apenas um middleware Express para verificação do id no Endpoint.
 * @throws {HttpException} 400 se o ID não for um UUID válido.
 */
export default function validateId(paramId: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = req.params[paramId];

        if (!isUUID(id)) {
            throw new HttpException(400, "Ivalid UUID")
        }

        next();
    }
}