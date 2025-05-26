import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/enum/UserRole";
import { HttpException } from "../error/HttpException";

/**
 * Middleware de controle de acesso baseado em papéis (roles).
 *
 * Esta função de fábrica de middleware retorna um middleware Express que verifica
 * se o `role` do usuário autenticado (presente em `req.user.role`) está incluído
 * na lista de `userRole` permitidos.
 *
 * Se o usuário não estiver autenticado (`req.user` for nulo) ou seu papel não for permitido,
 * uma `HttpException` com status 403 (Acesso Negado) é lançada.
 *
 * @param {UserRole[]} userRole - Um array de papéis de usuário permitidos para acessar a rota.
 * @returns {Function} Um middleware Express (Request, Response, NextFunction) => void.
 * @throws {HttpException} 403 se o usuário não tiver permissão para acessar a rota.
 */
export function roleCheck(userRole: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        //  `req.user` é populado por um middleware de autenticação anterior (e.g., jwtRequired)
        //  `req.user.role` contém o papel do usuário.
        if (!req.user || !userRole.includes(req.user.role)) {
            throw new HttpException(403, "Access denied");
        }
        next();
    }
}