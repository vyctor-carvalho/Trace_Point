import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";

const authController = new AuthController();

export const authRoutes = Router();

/**
 * @method POST de login
 */
authRoutes.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST in auth/login/");
    authController.login(req, res, next);
});

/**
 * @method POST de refresh de token
 */
authRoutes.post("/refresh", async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST in auth/refresh/");
    authController.refreshToken(req, res, next);
});
