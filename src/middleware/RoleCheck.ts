import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/enum/UserRole";
import { HttpException } from "../error/HttpException";

/**
 * @function roleCheck
 * @description Função de que cria e retorna um middleware Express para controle de acesso baseado em papéis (roles).
 * O middleware gerado verifica se o `role` do usuário autenticado (esperado em `req.user.role`)
 * está incluído na lista de `allowedRoles` fornecida.
 *
 * @param {UserRole[]} allowedRoles - Um array de `UserRole` que especifica os papéis permitidos para acessar a rota.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Um middleware Express.
 * Este middleware chamará `next()` se o usuário possuir um dos `allowedRoles`.
 * Caso contrário, chamará `next()` com uma `HttpException` (status 403 - Acesso Negado)
 */
export function roleCheck(userRole: UserRole[]) {

    return (req: Request, res: Response, next: NextFunction) => {
        
        if (!req.user || !userRole.includes(req.user.role)) {
            throw new HttpException(403, "Access denied");
        }
        next();
    }

}

/**
 * @function allowAllUsers
 * @description Retorna um middleware Express configurado para permitir o acesso a usuários autenticados
 * com qualquer um dos seguintes papéis: `admin`, `organizer` ou `visitor`.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} O middleware Express configurado para verificação de papéis.
 */
export const allowAllUsers = () => roleCheck([UserRole.admin, UserRole.organizer, UserRole.visitor]);

/**
 * @function allowOrganizer
 * @description Retorna um middleware Express configurado para permitir o acesso a usuários autenticados
 * com os papéis de `admin` ou `organizer`.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} O middleware Express configurado para verificação de papéis.
 */
export const allowOrganizer = () => roleCheck([UserRole.admin, UserRole.organizer]);

/**
 * @function onlyAdmin
 * @description Retorna um middleware Express configurado para permitir o acesso apenas a usuários autenticados
 * com o papel de `admin`.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} O middleware Express configurado para verificação de papéis.
 */
export const onlyAdmin = () => roleCheck([UserRole.admin]);