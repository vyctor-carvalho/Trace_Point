import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { VisitedDOT } from "../DTO/VisitedDTO";
import { VisitedService } from "../service/VisitedService";

export class VisitedController {

    private visitedService = new VisitedService();

    async registerVisit(req: Request, res: Response): Promise<Response> {

        const visitedDTO = plainToInstance(VisitedDOT, req.body);

        const visit = await this.visitedService.postVisit(visitedDTO);

        return res.status(201).json({
            message: "Visit registered",
            data: visit
        });

    }

    async findAllVisits(req: Request, res: Response): Promise<Response> {

        const visits = await this.visitedService.getVesits();

        if (visits.length === 0) {
            return res.status(200).json({
                message: "No visits found"
            });
        }

        return res.status(200).json({ visits });

    }

    async findVisitsByUser(req: Request, res: Response): Promise<Response> {

        const { userId } = req.params;

        const visits = await this.visitedService.getVisitByUser(userId);

        if (visits.length === 0) {
            return res.status(200).json({
                message: "User has no visit records"
            });
        }

        return res.status(200).json({ visits });

    }

    async findVisitsByPlace(req: Request, res: Response): Promise<Response> {

        const { placeId } = req.params;

        const visits = await this.visitedService.getVisitByPlace(placeId);

        if (visits.length === 0) {
            return res.status(200).json({
                message: "No visits recorded for this place"
            });
        }

        return res.status(200).json({ visits });

    }

    async updateVisit(req: Request, res: Response): Promise<Response> {

        const visitedDTO = plainToInstance(VisitedDOT, req.body);

        const updatedVisit = await this.visitedService.putVisit(visitedDTO);

        return res.status(200).json({
            message: "Visit updated",
            data: updatedVisit
        });

    }

    async deleteVisit(req: Request, res: Response): Promise<Response> {

        const { userId, placeId } = req.params;

        await this.visitedService.deleteVisit(userId, placeId);

        return res.status(200).json({
            message: "Visit deleted successfully"
        });
        
    }

}
