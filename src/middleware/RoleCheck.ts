import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/enum/UserRole";
import { HttpException } from "../error/HttpException";

export function roleCheck(userRole: UserRole[]) {

    return (req: Request, res: Response, next: NextFunction) => {
        
        if (!req.user || !userRole.includes(req.user.role)) {
            throw new HttpException(403, "Access denied");
        }
        next();
    }

}

export const allowAllUsers = () => roleCheck([UserRole.admin, UserRole.organizer, UserRole.visitor]);

export const allowOrganizer = () => roleCheck([UserRole.admin, UserRole.organizer]);

export const onlyAdmin = () => roleCheck([UserRole.admin]);