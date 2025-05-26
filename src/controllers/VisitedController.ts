import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { VisitedDOT } from "../DTO/VisitedDTO";
import { VisitedService } from "../service/VisitedService";

/**
 * @class VisitedController
 * @description Gerencia as operações relacionadas a visitas registradas por usuários a locais.
 */
export class VisitedController {

    private visitedService = new VisitedService();

    /**
     * @method registerVisit
     * @description Registra uma nova visita de um usuário a um local.
     * Converte os dados da requisição em um DTO de visita e salva a visita.
     */
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

    /**
     * @method findAllVisits
     * @description Busca e retorna todas as visitas registradas.
     * Retorna uma lista de visitas ou uma mensagem se nenhuma for encontrada.
     */
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

    /**
     * @method findVisitsByUser
     * @description Busca e retorna todas as visitas feitas por um usuário específico.
     * O ID do usuário é obtido dos parâmetros da requisição.
     */
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

    /**
     * @method findVisitsByPlace
     * @description Busca e retorna todas as visitas registradas para um local específico.
     * O ID do local é obtido dos parâmetros da requisição.
     */
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

    /**
     * @method updateVisit
     * @description Atualiza as informações de uma visita existente.
     * Os dados atualizados são obtidos do corpo da requisição.
     */
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

    /**
     * @method deleteVisit
     * @description Exclui uma visita específica.
     * Os IDs do usuário e do local são obtidos do corpo da requisição para identificar a visita a ser excluída.
     */
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