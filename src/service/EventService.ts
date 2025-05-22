import { Event } from "../models/Event"
import { EventDTO } from "../DTO/EventDTO";
import { PlaceService } from "../service/PlaceService";
import { eventRepository } from "../repositories/EventRepository";
import existsValidator from "../utils/ExistsValidator";
import validateDTO from "../utils/validateDTO";

export class EventService {

    private placeService = new PlaceService();

    async postEvent(eventDTO: EventDTO): Promise<Event> {

        await validateDTO(eventDTO);

        const place = await this.placeService.getPlaceById(eventDTO.place);

        existsValidator(place, "Place");

        const newEvent = eventRepository.create({
            title: eventDTO.title,
            eventDate: eventDTO.eventDate,
            descriptin: eventDTO.description,
            place: place,
        });

        return await eventRepository.save(newEvent);

    }

    async getEvents(): Promise<Event[]> {
        return await eventRepository.find();
    }

    async getEventById(id: string): Promise<Event | null> {
        return await eventRepository.findOneBy({id});
    }

    async putEvent(id: string, eventDTO: EventDTO): Promise<Event> {

        await validateDTO(eventDTO);

        const place = await this.placeService.getPlaceById(eventDTO.place);

        existsValidator(place, "Place");

        const event = await eventRepository.findOneBy({id});

        existsValidator(event, "Event");

        event.title = eventDTO.title;
        event.eventDate = eventDTO.eventDate;
        event.place = place;
        event.descriptin = eventDTO.description;

        return await eventRepository.save(event);

    }

    async deleteEvent(id: string): Promise<void> {

        const event = await eventRepository.findOneBy({id});

        existsValidator(event, "Event");

        await eventRepository.delete(event.id);

    }

}