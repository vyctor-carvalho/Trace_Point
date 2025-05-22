import { ErrorRequestHandler } from "express";

export const errorsHandler: ErrorRequestHandler = (error, req, res, next) => {

    console.error(error);

    res.status(error.status || 500).json({
        message: error.message || "Internal server error"
    });

}