import { VisitedDTO } from "../DTO/VisitedDTO";
import { UserService } from "../service/UserService";
import { PlaceService } from "../service/PlaceService";
import { VisitedPlaces } from "../models/VisitedPlaces";
import { visitedPlacesRepository } from "../repositories/VisitedRepository";
import validateRequestBody from "../utils/ValidateRequestBody";
import existsValidator from "../utils/ExistsValidator";
import { HttpException } from "../error/HttpException";

/**
 * Serviço de gerenciamento de visitas.
 * Responsável por registrar, buscar, atualizar e deletar visitas de usuários a locais.
 */
export class VisitedService {

    private userService = new UserService();

    private placeService = new PlaceService();

    /**
     * Registra uma nova visita a um local por um usuário.
     * Valida o DTO da visita, busca o usuário e o local,
     * e verifica se a data da visita não é no futuro.
     *
     * @param visitedDTO - O Data Transfer Object contendo os dados da visita (userId, placeId, visitDate).
     * @returns Uma Promise que resolve para a entidade VisitedPlaces recém-criada e salva.
     * @throws HttpException Se a validação do DTO falhar (via `validateRequestBody`),
     * se o usuário (via `userService.getUserById`) ou o local (via `placeService.getPlaceById` e `existsValidator`) não existirem,
     * ou se a data da visita for no futuro.
     */
    async postVisit(visitedDTO: VisitedDTO): Promise<VisitedPlaces> {

        await validateRequestBody(visitedDTO);

        const user = await this.userService.getUserById(visitedDTO.userId);

        existsValidator(user, "User");

        const place = await this.placeService.getPlaceById(visitedDTO.placeId);

        existsValidator(place, "Place");

        if (visitedDTO.visitDate.getTime() > Date.now()) {
            throw new HttpException(400, "Visit cannot be in the future");
        }

        const newVisited = visitedPlacesRepository.create({
            visitDate: visitedDTO.visitDate,
            user: user,
            place: place
        });

        return await visitedPlacesRepository.save(newVisited);

    }

    /**
     * Retorna uma lista de todos os registros de visitas.
     *
     * @returns Uma Promise que resolve para um array de entidades VisitedPlaces.
     */
    async getVesits(): Promise<VisitedPlaces[]> {
        return await visitedPlacesRepository.find();
    }

    /**
     * Busca todos os registros de visitas de um usuário específico.
     *
     * @param userId - O ID (UUID) do usuário cujas visitas devem ser buscadas.
     * @returns Uma Promise que resolve para um array de entidades VisitedPlaces do usuário especificado.
     * @throws HttpException Se o usuário com o ID fornecido não for encontrado (via `userService.getUserById`).
     */
    async getVisitByUser(userId: string): Promise<VisitedPlaces[]> {

        const user = await this.userService.getUserById(userId);
    
        existsValidator(user, "User");

        return visitedPlacesRepository.find({
            where: {
                user: {
                    id: user.id
                }
            },
            relations: {
                place: true,
                user: true
            }
        })
    
    }

    /**
     * Busca todos os registros de visitas a um local específico.
     *
     * @param placeId - O ID (UUID) do local cujas visitas devem ser buscadas.
     * @returns Uma Promise que resolve para um array de entidades VisitedPlaces do local especificado.
     * @throws HttpException Se o local com o ID fornecido não for encontrado (via `placeService.getPlaceById` e `existsValidator`).
     */
    async getVisitByPlace(placeId: string): Promise<VisitedPlaces[]> {

        const place = await this.placeService.getPlaceById(placeId);
    
        existsValidator(place, "place");

        return visitedPlacesRepository.find({
            where: {
                place: {
                    id: place.id
                }
            },
            relations: {
                place: true,
                user: true
            }
        })
    
    }

    /**
     * Atualiza um registro de visita existente.
     * Valida o DTO da visita, busca o usuário, o local e o registro de visita específico.
     *
     * @param visitedDTO - O Data Transfer Object contendo os dados atualizados da visita.
     * @returns Uma Promise que resolve para a entidade VisitedPlaces atualizada e salva.
     * @throws HttpException Se a validação do DTO falhar (via `validateRequestBody`),
     * ou se o usuário (via `userService.getUserById`), o local (via `placeService.getPlaceById` e `existsValidator`),
     * ou o registro da visita a ser atualizado (via `existsValidator`) não existirem.
     */
    async putVisit(visitedDTO: VisitedDTO): Promise<VisitedPlaces> {

        await validateRequestBody(visitedDTO);

        const user = await this.userService.getUserById(visitedDTO.userId);
        existsValidator(user, "User");

        const place = await this.placeService.getPlaceById(visitedDTO.placeId);
        existsValidator(place, "Place");

        const visitedPlaces = await visitedPlacesRepository.findOne({
            where: {
                user: { id: visitedDTO.userId },
                place: { id: visitedDTO.placeId }
            },
            relations: {
                user: true,
                place: true
            }
        });

        existsValidator(visitedPlaces, "VisitedPlace");

        visitedPlaces.visitDate = visitedDTO.visitDate;

        return await visitedPlacesRepository.save(visitedPlaces);
    }

    /**
     * Deleta um registro de visita específico, identificado pelo userId e placeId.
     * Busca o usuário, o local e o registro da visita antes de deletá-lo.
     *
     * @param userId - O ID (UUID) do usuário associado à visita.
     * @param placeId - O ID (UUID) do local associado à visita.
     * @returns Uma Promise que resolve quando a operação de deleção é concluída.
     * @throws HttpException Se o usuário (via `userService.getUserById`), o local (via `placeService.getPlaceById` e `existsValidator`),
     * ou o registro da visita a ser deletado (via `existsValidator`) não forem encontrados.
     */
    async deleteVisit(userId: string, placeId: string): Promise<void> {

        const user = await this.userService.getUserById(userId);
        existsValidator(user, "User");

        const place = await this.placeService.getPlaceById(placeId);
        existsValidator(place, "Place");

        const visit = await visitedPlacesRepository.findOne({
            where: {
                user: { id: userId },
                place: { id: placeId }
            }
        });

        existsValidator(visit, "VisitedPlace");

        await visitedPlacesRepository.remove(visit);
    }


}