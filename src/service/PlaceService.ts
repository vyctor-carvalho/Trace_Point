import { plainToInstance } from "class-transformer";

import { Place } from "../models/Place";
import { PlaceDTO } from "../DTO/PlaceDTO";
import { placeRepository } from "../repositories/PlaceRepository";
import existsValidator from "../utils/ExistsValidator";
import validateRequestBody from "../utils/ValidateRequestBody";
import { Address } from "../models/wrappers/Address";


export class PlaceService {

    /**
     * Cria um novo local.
     * Valida o DTO do local e então cria e salva a nova entidade Place.
     *
     * @param placeDTO - O Data Transfer Object contendo os dados do local.
     * @returns Uma Promise que resolve para a entidade Place recém-criada e salva.
     * @throws HttpException Se a validação dos dados de entrada (DTO) falhar (via `validateRequestBody`).
     */
    async postPlace(placeDTO: PlaceDTO): Promise<Place> {

        await validateRequestBody(placeDTO);

        const newPlace = placeRepository.create({
            name: placeDTO.name,
            type: placeDTO.type,
            address: {
                postalCode: placeDTO.getPostalCode(),
                numberHouse: placeDTO.getNumberHouse(),
                street: placeDTO.getStreet(),
                complement: placeDTO.getComplement()
            }
        })

        return await placeRepository.save(newPlace);

    }

    /**
     * Retorna uma lista de todos os locais cadastrados.
     *
     * @returns Uma Promise que resolve para um array de entidades Place.
     */
    async getPlaces(): Promise<Place[]> {
        return await placeRepository.find();
    }
    /**
     * Busca um local específico pelo seu ID, incluindo o evento associado, se houver.
     *
     * @param id - O ID (UUID) do local a ser buscado.
     * @returns Uma Promise que resolve para a entidade Place encontrada (com seu evento) ou null se não existir.
     */
    async getPlaceById(id: string): Promise<Place | null> {
        return placeRepository.findOne({
            where: { id },
            relations: {
                event: true
            }
        }); 
    }

    /**
     * Atualiza um local existente.
     * Valida o DTO do local e busca o local a ser atualizado.
     *
     * @param id - O ID (UUID) do local a ser atualizado.
     * @param placeDTO - O Data Transfer Object contendo os novos dados do local.
     * @returns Uma Promise que resolve para a entidade Place atualizada e salva.
     * @throws HttpException Se a validação dos dados de entrada (DTO) falhar (via `validateRequestBody`),
     * ou se o local a ser atualizado não for encontrado (via `existsValidator`).
     */
    async putPlace(id: string, placeDTO: PlaceDTO): Promise<Place> {

        await validateRequestBody(placeDTO);

        const place = await placeRepository.findOneBy({id});

        existsValidator(place, "Place"); 

        place.name = placeDTO.name;
        place.type = placeDTO.type;
        place.address = plainToInstance(Address, placeDTO.address);

        return placeRepository.save(place);

    }

    /**
     * Deleta um local específico pelo seu ID.
     * Verifica se o local existe antes de tentar deletá-lo.
     *
     * @param id - O ID (UUID) do local a ser deletado.
     * @returns Uma Promise que resolve quando a operação de deleção é concluída.
     * @throws HttpException Se o local a ser deletado não for encontrado (via `existsValidator`).
     */
    async deletePlace(id: string): Promise<void> {

        const place = await placeRepository.findOneBy({id});

        existsValidator(place, "Place");

        await placeRepository.delete(place.id);

    }

}