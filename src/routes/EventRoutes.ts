import { logger } from '../utils/logger'; // Caminho correto para o logger

import { Router, Request, Response, NextFunction } from "express";
import { EventController } from "../controllers/EventController";
import validateId from "../middleware/ValidateId";
import jwtRequired from "../middleware/JwtRequired";
import { allowAllUsers, allowOrganizer } from "../middleware/RoleCheck";

export const eventRouter = Router();

const eventController = new EventController();

/**
 * @method POST de Event
 */
eventRouter.post("/", jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("POST in /event/");
    eventController.createEvent(req, res, next);
});

/**
 * @method GET para todos os registros de Event
 */
eventRouter.get("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response) => {
    logger.info("GET in /event/");
    eventController.findAllEvent(req, res);
});

/**
 * @method GET de um Event pelo id
 */
eventRouter.get("/:id", validateId("id"), jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("GET in /event/:id");
    eventController.findEventByI(req, res, next);
});

/**
 * @method PUT de Event
 */
eventRouter.put("/:id", validateId("id"), jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("PUT in /event/:id");
    eventController.updateEvent(req, res, next);
});

/**
 * @method DELETE de Event
 */
eventRouter.delete("/:id", validateId("id"), jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("DELETE in /event/:id");
    eventController.deleteEvent(req, res, next);
});