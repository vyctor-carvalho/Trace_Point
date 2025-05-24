import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";

import { EventService } from "../service/EventService";
import { EventDTO } from "../DTO/EventDTO";

export class EventController {

    private eventService = new EventService();

    async createEvent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const eventDTO = plainToInstance(EventDTO, req.body);

            const event = await this.eventService.postEvent(eventDTO);

            return res.status(201).json({
                message: "Event created",
                data: event
            });

        } catch (error) {
            next(error);
        }
    }

    async findAllEvent(req: Request, res: Response): Promise<Response> {

        const events = await this.eventService.getEvents();

        if (events.length === 0) {
            return res.status(200).json({
                message: "No events found"
            });
        }

        return res.status(200).json({ events });

    }

    async findEventByI(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const eventId = req.params.id;
            
            const event = await this.eventService.getEventById(eventId);

            if (!event) {
                return res.status(404).json({
                    message: `Event not found`
                });
            }

            return res.status(200).json({ event });

        } catch (error) {
            next(error);
        }
    }

    async updateEvent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const eventId = req.params.id;

            const eventDTO = plainToInstance(EventDTO, req.body);

            const event = await this.eventService.putEvent(eventId, eventDTO);

            return res.status(200).json({
                message: "Event updated",
                data: event
            });

        } catch (error) {
            next(error);
        }
    }

    async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const eventId = req.params.id;
            
            await this.eventService.deleteEvent(eventId);

            return res.status(200).json({
                message: "Event deleted successfully"
            });
            
        } catch (error) {
            next(error);
        }
    }
}
