import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { VisitedDOT } from "../DTO/VisitedDTO";
import { VisitedService } from "../service/VisitedService";

export class VisitedController {

    private visitedService = new VisitedService();

    /**
     * Registra uma nova visita a um local.
     * Recebe os dados da visita (VisitedDTO) no corpo da requisição.
     *
     * @param req - O objeto de requisição do Express, contendo o VisitedDTO no corpo.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo a visita registrada e uma mensagem de sucesso,
     * ou chama `next` com um erro em caso de falha.
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
     * Busca todos os registros de visitas.
     *
     * @param req - O objeto de requisição do Express.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo a lista de visitas
     * ou uma mensagem caso nenhum registro seja encontrado, ou chama `next` com um erro.
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
     * Busca todos os registros de visitas de um usuário específico.
     * O ID do usuário é passado como parâmetro na URL.
     *
     * @param req - O objeto de requisição do Express, contendo o ID do usuário nos parâmetros da rota.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo as visitas do usuário,
     * ou uma mensagem caso nenhum registro seja encontrado para o usuário, ou chama `next` com um erro.
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
     * Busca todos os registros de visitas a um local específico.
     * O ID do local é passado como parâmetro na URL.
     *
     * @param req - O objeto de requisição do Express, contendo o ID do local nos parâmetros da rota.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo as visitas ao local,
     * ou uma mensagem caso nenhum registro seja encontrado para o local, ou chama `next` com um erro.
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
     * Atualiza um registro de visita existente.
     * Os dados da visita (VisitedDTO), incluindo os identificadores necessários para encontrar o registro,
     * são enviados no corpo da requisição.
     *
     * @param req - O objeto de requisição do Express, contendo o VisitedDTO no corpo.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo a visita atualizada e uma mensagem de sucesso,
     * ou chama `next` com um erro em caso de falha.
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
     * Deleta um registro de visita.
     * Os identificadores da visita (userId e placeId) são enviados no corpo da requisição.
     *
     * @param req - O objeto de requisição do Express, contendo userId e placeId no corpo.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com uma resposta JSON indicando sucesso na deleção,
     * ou chama `next` com um erro em caso de falha.
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
