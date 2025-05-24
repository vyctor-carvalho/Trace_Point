import { Router, Request, Response, NextFunction } from "express";

import { PlaceController } from "../controllers/PlaceController";
import validateId from "../middleware/ValidateId";
import jwtRequired from "../middleware/JwtRequired";
import { allowOrganizer, allowAllUsers, onlyAdmin } from "../middleware/RoleCheck";

export const placeRouter = Router();

const placeController = new PlaceController();

/**
 * Método POST de Place
 */
placeRouter.post("/", jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("POST in /place/");
    placeController.registerPlace(req, res, next);
});


/**
 * Método GET de Place
 */
placeRouter.get("/", jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET in /place/");
    placeController.findAllPlaces(req, res);
});


/**
 * Método GET de um Place pelo id
 */
placeRouter.get("/:id", validateId("id"), jwtRequired, allowAllUsers(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("GET in /place/:id");
    placeController.findPlaceById(req, res, next);
});


/**
 * Método PUT de Place
 */
placeRouter.put("/:id", validateId("id"), jwtRequired, allowOrganizer(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("PUT in /place/:id");
    placeController.updatePlace(req, res, next);
});


/**
 * Método DELETE de Place
 */
placeRouter.delete("/:id", validateId("id"), jwtRequired, onlyAdmin(), async (req: Request, res: Response, next: NextFunction) => {
    console.log("DELETE in /place/:id");
    placeController.deletePlace(req, res, next);
})