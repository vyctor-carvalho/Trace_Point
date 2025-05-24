import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { PlaceService } from "../service/PlaceService";
import { PlaceDTO } from "../DTO/PlaceDTO";

export class PlaceController {

    private placeService = new PlaceService();

    async registerPlace(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const placeDTO = plainToInstance(PlaceDTO, req.body);

            const place = await this.placeService.postPlace(placeDTO);

            return res.status(201).json({
                message: "Place registered",
                data: place
            });

        } catch (error) {
            next(error);
        }
    }

    async findAllPlaces(req: Request, res: Response): Promise<Response | void> {
    
        const places = await this.placeService.getPlaces();

        if (places.length === 0) {
            return res.status(200).json({
                message: "No places found"
            });
        }

        return res.status(200).json({ places });

    }

    async findPlaceById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;

            const place = await this.placeService.getPlaceById(id);

            if (!place) {
                return res.status(404).json({
                    message: "Place not found"
                });
            }

            return res.status(200).json({ place });

        } catch (error) {
            next(error);
        }
    }

    async updatePlace(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;

            const placeDTO = plainToInstance(PlaceDTO, req.body);

            const updatedPlace = await this.placeService.putPlace(id, placeDTO);

            return res.status(200).json({
                message: "Place updated",
                data: updatedPlace
            });

        } catch (error) {
            next(error);
        }
    }

    async deletePlace(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;

            await this.placeService.deletePlace(id);

            return res.status(200).json({
                message: "Place deleted successfully"
            });
            
        } catch (error) {
            next(error);
        }
    }
}
