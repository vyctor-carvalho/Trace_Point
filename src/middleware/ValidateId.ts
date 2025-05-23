import { Request, Response, NextFunction } from "express";
import { isUUID } from "class-validator";

import { HttpException } from "../error/HttpException";

export default function validateId(paramId: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = req.params[paramId];

        if (!isUUID(id)) {
            throw new HttpException(400, "Ivalid UUID")
        }

        next();
    }
}