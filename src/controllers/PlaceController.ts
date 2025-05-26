import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { PlaceService } from "../service/PlaceService";
import { PlaceDTO } from "../DTO/PlaceDTO";

/**
 * @class PlaceController
 * @description Controla as operações CRUD para locais (places).
 */
export class PlaceController {

    private placeService = new PlaceService();

    /**
     * @method registerPlace
     * Registra um novo local.
     * Recebe os dados do local (PlaceDTO) no corpo da requisição (`req.body`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o PlaceDTO no corpo.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o local registrado e uma mensagem de sucesso,
     * ou chama `next(error)` em caso de falha.
     */
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

    /**
     * @method findAllPlaces
     * Busca todos os locais cadastrados.
     *
     * @param {Request} req - O objeto de requisição do Express.
     * @param {Response} res - O objeto de resposta do Express.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo a lista de locais
     * ou uma mensagem caso nenhum local seja encontrado.
     */
    async findAllPlaces(req: Request, res: Response): Promise<Response | void> {
        const places = await this.placeService.getPlaces();
        if (places.length === 0) {
            return res.status(200).json({
                message: "No places found"
            });
        }
        return res.status(200).json({ places });
    }

    /**
     * @method findPlaceById
     * Busca um local específico pelo seu ID.
     * O ID do local é passado como parâmetro na URL (`req.params.id`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do local nos parâmetros da rota.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o local encontrado,
     * ou uma resposta com status 404 se não encontrado, ou chama `next(error)` em caso de outras falhas.
     */
    async findPlaceById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        
        const { id } = req.params;

        const place = await this.placeService.getPlaceById(id);

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        return res.status(200).json({ place });
        
    }

    /**
     * @method updatePlace
     * Atualiza um local existente.
     * O ID do local a ser atualizado é passado como parâmetro na URL (`req.params.id`),
     * e os novos dados do local (PlaceDTO) são enviados no corpo da requisição (`req.body`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do local nos parâmetros e PlaceDTO no corpo.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o local atualizado e uma mensagem de sucesso,
     * ou chama `next(error)` em caso de falha.
     */
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

    /**
     * @method deletePlace
     * Deleta um local existente.
     * O ID do local a ser deletado é passado como parâmetro na URL (`req.params.id`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do local nos parâmetros da rota.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com uma resposta JSON indicando sucesso na deleção,
     * ou chama `next(error)` em caso de falha.
     */
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