import { Router, Request, Response, NextFunction } from "express";

import { EventController } from "../controllers/EventController";
import validateId from "../middleware/ValidateId";
import jwtRequired from "../middleware/JwtRequired";
import { allowAllUsers, allowOrganizer } from "../middleware/RoleCheck";


export const eventRouter = Router();

const eventController = new EventController();


/**
 * Método POST de Event
 */
eventRouter.post("/", jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST in /event/");
    eventController.createEvent(req, res, next);
});


/**
 * Método GET para todos os registros de Event
 */
eventRouter.get("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response) => {
    console.log("GET in /event/");
    eventController.findAllEvent(req, res);
});


/**
 * Método GET de um Event pelo id
 */
eventRouter.get("/:id", validateId("id"), jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET in /event/:id");
    eventController.findEventByI(req, res, next);
});


/**
 * Método PUT de Event
 */
eventRouter.put("/:id", validateId("id"), jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("PUT in /event/:id");
    eventController.updateEvent(req, res, next);
});


/**
 * Método DELETE de Event
 */
eventRouter.delete("/:id", validateId("id"), jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("DELETE in /event/:id");
    eventController.deleteEvent(req, res, next);
});