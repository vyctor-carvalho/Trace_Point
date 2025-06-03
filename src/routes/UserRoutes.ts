import { logger } from '../utils/logger'; // Importando o logger

import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/UserController";
import validateId from "../middleware/ValidateId";
import jwtRequired from "../middleware/JwtRequired";
import { allowAllUsers, onlyAdmin } from "../middleware/RoleCheck";

const userController = new UserController();

export const userRouter = Router();

/**
 * @method POST de User
 */
userRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    logger.info("POST in /user/register"); 
    userController.registerUser(req, res, next);
});

/**
 * @method POST de Booking pro um userId e um eventId
 */
userRouter.post("/booking", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("POST in /user/booking"); 
    userController.eventBooking(req, res, next);
});

/**
 * @method GET de Users
 */
userRouter.get("/", jwtRequired, onlyAdmin(), async (req: Request, res: Response) => {
    logger.info("GET in /user/"); 
    userController.findAllUsers(req, res);
});

/**
 * @method GET de User pelo id
 */
userRouter.get("/:id", validateId("id"), jwtRequired, onlyAdmin(), (req: Request, res: Response, next: NextFunction) => {
    logger.info("GET in /user/:id");
    userController.findUserById(req, res, next);
});

/**
 * @method PUT de User
 */
userRouter.put("/:id", validateId("id"), jwtRequired, (req: Request, res: Response, next: NextFunction) => {
    logger.info("PUT in /user/:id");
    userController.updateUser(req, res, next);
});

/**
 * @method DELETE de User
 */
userRouter.delete("/:id", validateId("id"), jwtRequired, onlyAdmin(), (req: Request, res: Response, next: NextFunction) => {
    logger.info("DELETE in /user/:id");
    userController.deleteUser(req, res, next);
});