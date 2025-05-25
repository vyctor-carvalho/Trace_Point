import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { VisitedDOT } from "../DTO/VisitedDTO";
import { VisitedService } from "../service/VisitedService";

export class VisitedController {

    private visitedService = new VisitedService();

    async registerVisit(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const visitedDTO = plainToInstance(VisitedDOT, req.body);

            const visit = await this.visitedService.postVisit(visitedDTO);

            return res.status(201).json({
                message: "Visit registered",
                data: visit
            });

        } catch (error) {
            next(error);
        }
    }

    async findAllVisits(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const visits = await this.visitedService.getVesits();

            if (visits.length === 0) {
                return res.status(200).json({
                    message: "No visits found"
                });
            }

            return res.status(200).json({ visits });
            
        } catch (error) {
            next(error);
        }
    }

    async findVisitsByUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { userId } = req.params;

            const visits = await this.visitedService.getVisitByUser(userId);

            if (visits.length === 0) {
                return res.status(200).json({
                    message: "No visits recorded for this user"
                });
            }

            return res.status(200).json({ visits });

        } catch (error) {
            next(error);
        }
    }

    async findVisitsByPlace(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { placeId } = req.params;

            const visits = await this.visitedService.getVisitByPlace(placeId);

            if (visits.length === 0) {
                return res.status(200).json({
                    message: "No visits recorded for this place"
                });
            }

            return res.status(200).json({ visits });

        } catch (error) {
            next(error);
        }
    }

    async updateVisit(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const visitedDTO = plainToInstance(VisitedDOT, req.body);

            const updatedVisit = await this.visitedService.putVisit(visitedDTO);

            return res.status(200).json({
                message: "Visit updated",
                data: updatedVisit
            });

        } catch (error) {
            next(error);
        }
    }

    async deleteVisit(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { userId, placeId } = req.body;

            await this.visitedService.deleteVisit(userId, placeId);

            return res.status(200).json({
                message: "Visit deleted successfully"
            });
            
        } catch (error) {
            next(error);
        }
    }

}
