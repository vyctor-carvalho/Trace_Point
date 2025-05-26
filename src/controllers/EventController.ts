import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";

import { EventService } from "../service/EventService";
import { EventDTO } from "../DTO/EventDTO";

/**
 * @class EventController
 * @description Gerencia as operações relacionadas a eventos (criar, listar, buscar, atualizar, deletar).
 */
export class EventController {

    private eventService = new EventService();

    /**
     * @method createEvent
     * Cria um novo evento.
     * Recebe os dados do evento (EventDTO) no corpo da requisição.
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o EventDTO no corpo (`req.body`).
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o evento criado e uma mensagem de sucesso,
     * ou chama `next(error)` em caso de falha.
     */
    async createEvent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const eventDTO = plainToInstance(EventDTO, req.body);
            const event = await this.eventService.postEvent(eventDTO);
            return res.status(201).json({ message: "Event created", data: event });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method findAllEvent
     * Busca todos os eventos cadastrados.
     *
     * @param {Request} req - O objeto de requisição do Express.
     * @param {Response} res - O objeto de resposta do Express.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo a lista de eventos
     * ou uma mensagem caso nenhum evento seja encontrado.
     */
    async findAllEvent(req: Request, res: Response): Promise<Response> {
        const events = await this.eventService.getEvents();
        if (events.length === 0) {
            return res.status(200).json({ message: "No events found" });
        }
        return res.status(200).json({ events });
    }

    /**
     * @method findEventById
     * Busca um evento específico pelo seu ID.
     * O ID do evento é passado como parâmetro na URL (`req.params.id`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do evento nos parâmetros da rota.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o evento encontrado,
     * ou uma resposta com status 404 se não encontrado, ou chama `next(error)` em caso de outras falhas.
     */
    async findEventByI(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const eventId = req.params.id;
            const event = await this.eventService.getEventById(eventId);
            if (!event) {
                return res.status(404).json({ message: `Event not found` });
            }
            return res.status(200).json({ event });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method updateEvent
     * Atualiza um evento existente.
     * O ID do evento a ser atualizado é passado como parâmetro na URL (`req.params.id`),
     * e os novos dados do evento (EventDTO) são enviados no corpo da requisição (`req.body`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do evento nos parâmetros e EventDTO no corpo.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o evento atualizado e uma mensagem de sucesso,
     * ou chama `next(error)` em caso de falha (ex: evento não encontrado, validacao falhou).
     */
    async updateEvent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const eventId = req.params.id;
            const eventDTO = plainToInstance(EventDTO, req.body);
            const event = await this.eventService.putEvent(eventId, eventDTO);
            return res.status(200).json({ message: "Event updated", data: event });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method deleteEvent
     * Deleta um evento existente.
     * O ID do evento a ser deletado é passado como parâmetro na URL (`req.params.id`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do evento nos parâmetros da rota.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com uma resposta JSON indicando sucesso na deleção,
     * ou chama `next(error)` em caso de falha (ex: evento não encontrado).
     */
    async deleteEvent(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const eventId = req.params.id;
            await this.eventService.deleteEvent(eventId);
            return res.status(200).json({ message: "Event deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}