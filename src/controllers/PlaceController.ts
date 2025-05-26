import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { PlaceService } from "../service/PlaceService";
import { PlaceDTO } from "../DTO/PlaceDTO";

export class PlaceController {

    private placeService = new PlaceService();

    /**
     * Registra um novo local.
     * Recebe os dados do local (PlaceDTO) no corpo da requisição.
     *
     * @param req - O objeto de requisição do Express, contendo o PlaceDTO no corpo.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo o local registrado e uma mensagem de sucesso,
     * ou chama `next` com um erro em caso de falha.
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
     * Busca todos os locais cadastrados.
     *
     * @param req - O objeto de requisição do Express.
     * @param res - O objeto de resposta do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo a lista de locais
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
     * Busca um local específico pelo seu ID.
     * O ID do local é passado como parâmetro na URL.
     *
     * @param req - O objeto de requisição do Express, contendo o ID do local nos parâmetros da rota.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo o local encontrado,
     * ou uma resposta 404 se não encontrado.
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
     * Atualiza um local existente.
     * O ID do local a ser atualizado é passado como parâmetro na URL,
     * e os novos dados do local (PlaceDTO) são enviados no corpo da requisição.
     *
     * @param req - O objeto de requisição do Express, contendo o ID do local nos parâmetros e PlaceDTO no corpo.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo o local atualizado e uma mensagem de sucesso,
     * ou chama `next` com um erro em caso de falha (ex: local não encontrado).
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
     * Deleta um local existente.
     * O ID do local a ser deletado é passado como parâmetro na URL.
     *
     * @param req - O objeto de requisição do Express, contendo o ID do local nos parâmetros da rota.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com uma resposta JSON indicando sucesso na deleção,
     * ou chama `next` com um erro em caso de falha (ex: local não encontrado).
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
