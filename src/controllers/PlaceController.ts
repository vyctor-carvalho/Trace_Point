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
     * @description Registra um novo local.
     * Converte os dados da requisição em um DTO e salva o local.
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
     * @description Busca e retorna todos os locais.
     * Retorna uma lista de locais ou uma mensagem se nenhum for encontrado.
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
     * @description Busca um local específico pelo seu ID.
     * Retorna o local encontrado ou uma mensagem de "não encontrado".
     */
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

    /**
     * @method updatePlace
     * @description Atualiza as informações de um local existente.
     * Converte os dados da requisição em um DTO e atualiza o local pelo ID.
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
     * @description Exclui um local pelo seu ID.
     * Retorna uma mensagem de sucesso após a exclusão.
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