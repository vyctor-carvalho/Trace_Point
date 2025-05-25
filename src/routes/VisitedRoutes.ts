import { Router, Request, Response, NextFunction } from "express";

import { VisitedController } from "../controllers/VisitedController";
import validateId from "../middleware/ValidateId";
import jwtRequired from "../middleware/JwtRequired";
import { allowAllUsers, allowOrganizer } from "../middleware/RoleCheck";

export const visitedRoutes = Router();

const visitedController = new VisitedController();


/**
 * Método POST de Visited
 */
visitedRoutes.post("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST in /visited/");
    visitedController.registerVisit(req, res, next);
});


/**
 * Método GET para todas os registros de Visited
 */
visitedRoutes.get("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET in /visited/");
    visitedController.findAllVisits(req, res, next);
});


/**
 * Método GET por userId
 */
visitedRoutes.get("/user/:userId", validateId("userId"), jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET in /visited/user/:userId");
    visitedController.findVisitsByUser(req, res, next);
});


/**
 * Método GET por placeId
 */
visitedRoutes.get("/place/:placeId", validateId("placeId"), jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET in /visited/place/:placeId");
    visitedController.findVisitsByPlace(req, res, next);
});


/**
 * Método PUT de Visited
 */
visitedRoutes.put("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("PUT in /visited/");
    visitedController.updateVisit(req, res, next);
});


/**
 * Método DELETE de Visited
 */
visitedRoutes.delete("/", jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("DELETE in /visited/");
    visitedController.deleteVisit(req, res, next);
});