import { validate } from "class-validator";

import { EventDTO } from "../DTO/EventDTO";
import { HttpException } from "../error/HttpException";
import { eventRepository } from "../repositories/EventRepository";
import { placeRepository } from "../repositories/PlaceRepository";

export class EventService {

    async postEvent(eventDTO: EventDTO) {

        const error = await validate(eventDTO);

        if (error.length > 0) {
            throw new HttpException(400, "Invalid json");
        }

        const place = await placeRepository.findOneBy({id: eventDTO.place })

        if (!place) {
            throw new HttpException(404, `Place whith id ${eventDTO.place} not found`)
        }

        const newEvent = eventRepository.create({
            title: eventDTO.title,
            eventDate: eventDTO.eventDate,
            descriptin: eventDTO.descriptin,
            place: place,
        });

        return await eventRepository.save(newEvent);

    }

    async getEvents() {
        return await eventRepository.find();
    }

    async getEventById(id: string) {
        return await eventRepository.findOneBy({id});
    }

    async putEvent(id: string, eventDTO: EventDTO) {

        const error = await validate(eventDTO);

        if (error.length > 0) {
            throw new HttpException(400, "Invalid json");
        }

        const place = await placeRepository.findOneBy({ id: eventDTO.place })

        if (!place) {
            throw new HttpException(404, `Place whith id ${id} not fuond`);
        }

        const event = await eventRepository.findOneBy({id});

        if (!event) {
            throw new HttpException(404, `Event whith id ${id} not fuond`);
        }

        event.title = eventDTO.title;
        event.eventDate = eventDTO.eventDate;
        event.place = place;
        event.descriptin = eventDTO.descriptin;

        return await eventRepository.save(event);

    }

    async deleteEvent(id: string) {

        const event = await eventRepository.findOneBy({id});

        if (!event) {
            throw new HttpException(404, `Event whith id ${id} not fuond`);
        }

        return await eventRepository.delete(event.id);

    }

}