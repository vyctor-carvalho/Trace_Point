import { Router, Request, Response, NextFunction } from "express";

import { UserController } from "../controllers/UserController";
import validateId from "../middleware/ValidateId";
import jwtRequired from "../middleware/JwtRequired";
import { allowAllUsers, onlyAdmin } from "../middleware/RoleCheck";

const userController = new UserController();

export const userRouter = Router();


/**
 * Métodos POST de User
 */
userRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST in /user/register");
    userController.registerUser(req, res, next);
})


/**
 * Métodos POST de Booking pro um userId e um eventId
 */
userRouter.post("/booking", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST in /user/booking");
    userController.eventBooking(req, res, next);
});


/**
 * Métodos GET de Users
 */
userRouter.get("/",jwtRequired, onlyAdmin(), async (req: Request, res: Response) => {
    console.log("GET in /user/");
    userController.findAllUsers(req, res);
});


/**
 * Métodos GET de User pelo id
 */
userRouter.get("/:id", validateId("id"), jwtRequired, onlyAdmin(), (req: Request, res: Response, next: NextFunction) => {
    console.log("GET in /user/:id");
    userController.findUserById(req, res, next);
});


/**
 * Métodos PUT de User
 */
userRouter.put("/:id", validateId("id"), jwtRequired, (req: Request, res: Response, next: NextFunction) => {
    console.log("PUT in /user/:id");
    userController.updateUser(req, res, next);
});


/**
 * Métodos DELETE de User
 */
userRouter.delete("/:id", validateId("id"), jwtRequired, onlyAdmin(), (req:Request, res: Response, next: NextFunction) => {
    console.log("DELETE in /user/:id");
    userController.deleteUser(req, res, next);
});