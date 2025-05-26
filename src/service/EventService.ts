import { Event } from "../models/Event"
import { EventDTO } from "../DTO/EventDTO";
import { PlaceService } from "../service/PlaceService";
import { eventRepository } from "../repositories/EventRepository";
import existsValidator from "../utils/ExistsValidator";
import validateRequestBody from "../utils/ValidateRequestBody";
import { HttpException } from "../error/HttpException";

/**
 * Serviço de gerenciamento de eventos.
 * Responsável por criar, buscar, atualizar e deletar eventos.
 */
export class EventService {
    
    private placeService = new PlaceService();

    /**
     * Cria um novo evento.
     * Valida o DTO do evento, verifica se a data do evento não é no passado,
     * busca o local associado e verifica se o local já não possui um evento.
     *
     * @param eventDTO - O Data Transfer Object contendo os dados do evento.
     * @returns Uma Promise que resolve para a entidade Event recém-criada e salva.
     * @throws HttpException Se a validação dos dados de entrada falhar (via `validateRequestBody`),
     * se a data do evento for no passado, se o local associado não for encontrado (via `existsValidator` no `placeService.getPlaceById` ou aqui),
     * ou se o local já possuir um evento.
     */
    async postEvent(eventDTO: EventDTO): Promise<Event> {

        await validateRequestBody(eventDTO);

        if (eventDTO.eventDate.getTime() < Date.now()) {
            throw new HttpException(400, "Event cannot be created in the past");
        }

        const place = await this.placeService.getPlaceById(eventDTO.place);

        existsValidator(place, "Place");

        if (place.event) {
            throw new HttpException(400, "Place already has an event");
        }

        const newEvent = eventRepository.create({
            title: eventDTO.title,
            eventDate: eventDTO.eventDate,
            description: eventDTO.description,
            place: place,
        });

        return await eventRepository.save(newEvent);

    }

    /**
     * Retorna uma lista de todos os eventos cadastrados.
     *
     * @returns Uma Promise que resolve para um array de entidades Event.
     */
    async getEvents(): Promise<Event[]> {
        return await eventRepository.find();
    }

    /**
     * Busca um evento específico pelo seu ID.
     *
     * @param id - O ID (UUID) do evento a ser buscado.
     * @returns Uma Promise que resolve para a entidade Event encontrada ou null se não existir.
     */
    async getEventById(id: string): Promise<Event | null> {
        return await eventRepository.findOneBy({id});
    }

    /**
     * Atualiza um evento existente.
     * Valida o DTO do evento, busca o local e o evento a serem atualizados.
     *
     * @param id - O ID (UUID) do evento a ser atualizado.
     * @param eventDTO - O Data Transfer Object contendo os novos dados do evento.
     * @returns Uma Promise que resolve para a entidade Event atualizada e salva.
     * @throws HttpException Se a validação dos dados de entrada falhar (via `validateRequestBody`),
     * ou se o local ou o evento não forem encontrados (via `existsValidator` no `placeService.getPlaceById` ou para o próprio evento).
     */
    async putEvent(id: string, eventDTO: EventDTO): Promise<Event> {

        await validateRequestBody(eventDTO);

        const place = await this.placeService.getPlaceById(eventDTO.place);

        existsValidator(place, "Place");

        const event = await eventRepository.findOneBy({id});

        existsValidator(event, "Event");

        event.title = eventDTO.title;
        event.eventDate = eventDTO.eventDate;
        event.place = place;
        event.description = eventDTO.description;

        return await eventRepository.save(event);

    }
    
    /**
     * Deleta um evento específico pelo seu ID.
     * Verifica se o evento existe antes de tentar deletá-lo.
     *
     * @param id - O ID (UUID) do evento a ser deletado.
     * @returns Uma Promise que resolve quando a operação de deleção é concluída.
     * @throws HttpException Se o evento não for encontrado (via `existsValidator`).
     */
    async deleteEvent(id: string): Promise<void> {

        const event = await eventRepository.findOneBy({id});

        existsValidator(event, "Event");

        await eventRepository.delete(event.id);

    }

}