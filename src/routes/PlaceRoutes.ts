import { logger } from '../utils/logger'; // Importando o logger

import { Router, Request, Response, NextFunction } from "express";
import { PlaceController } from "../controllers/PlaceController";
import validateId from "../middleware/ValidateId";
import jwtRequired from "../middleware/JwtRequired";
import { allowOrganizer, allowAllUsers, onlyAdmin } from "../middleware/RoleCheck";

export const placeRouter = Router();

const placeController = new PlaceController();

/**
 * @method POST de Place
 */
placeRouter.post("/", jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("POST in /place/");
    placeController.registerPlace(req, res, next);
});

/**
 * @method GET de Place
 */
placeRouter.get("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response) => {
    logger.info("GET in /place/");
    placeController.findAllPlaces(req, res);
});

/**
 * @method GET de um Place pelo id
 */
placeRouter.get("/:id", validateId("id"), jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("GET in /place/:id");
    placeController.findPlaceById(req, res, next);
});

/**
 * @method PUT de Place
 */
placeRouter.put("/:id", validateId("id"), jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("PUT in /place/:id");
    placeController.updatePlace(req, res, next);
});

/**
 * @method DELETE de Place
 */
placeRouter.delete("/:id", validateId("id"), jwtRequired, onlyAdmin(), async (req: Request, res: Response, next: NextFunction) => {
    logger.info("DELETE in /place/:id");
    placeController.deletePlace(req, res, next);
});