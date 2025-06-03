import { logger } from '../utils/logger';

import { Router, Request, Response, NextFunction } from "express";
import { VisitedController } from "../controllers/VisitedController";
import validateId from "../middleware/ValidateId";
import jwtRequired from "../middleware/JwtRequired";
import { allowAllUsers, allowOrganizer } from "../middleware/RoleCheck";

export const visitedRoutes = Router();

const visitedController = new VisitedController();

/**
 * @method POST de Visited
 */
visitedRoutes.post("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("POST in /visited/");
    visitedController.registerVisit(req, res, next);
});

/**
 * @method GET para todas os registros de Visited
 */
visitedRoutes.get("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("GET in /visited/");
    visitedController.findAllVisits(req, res, next);
});

/**
 * @method GET por userId
 */
visitedRoutes.get("/user/:userId", validateId("userId"), jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("GET in /visited/user/:userId");
    visitedController.findVisitsByUser(req, res, next);
});

/**
 * @method GET por placeId
 */
visitedRoutes.get("/place/:placeId", validateId("placeId"), jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("GET in /visited/place/:placeId");
    visitedController.findVisitsByPlace(req, res, next);
});

/**
 * @method PUT de Visited
 */
visitedRoutes.put("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("PUT in /visited/");
    visitedController.updateVisit(req, res, next);
});

/**
 * @method DELETE de Visited
 */
visitedRoutes.delete("/", jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("DELETE in /visited/");
    visitedController.deleteVisit(req, res, next);
});