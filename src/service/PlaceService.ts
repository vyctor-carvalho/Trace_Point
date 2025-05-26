import { plainToInstance } from "class-transformer";

import { Place } from "../models/Place";
import { PlaceDTO } from "../DTO/PlaceDTO";
import { placeRepository } from "../repositories/PlaceRepository";
import existsValidator from "../utils/ExistsValidator";
import validateRequestBody from "../utils/ValidateRequestBody";
import { Address } from "../models/wrappers/Address";

/**
 * Serviço de gerenciamento de lugares.
 * Responsável por criar, buscar, atualizar e deletar lugares.
 */


export class PlaceService {

    /*
    * Adiciona um novo lugar.
    */

    async postPlace(placeDTO: PlaceDTO): Promise<Place> {

        await validateRequestBody(placeDTO);

        const newPlace = placeRepository.create({
            name: placeDTO.name,
            type: placeDTO.type,
            address: {
                postalColde: placeDTO.getPostalCode(),
                numberHouse: placeDTO.getNumberHouse(),
                street: placeDTO.getStreet(),
                complement: placeDTO.getComplement()
            }
        })

        return await placeRepository.save(newPlace);

    }
    /*
    * Obtém todos os lugares cadastrados.
    */

    async getPlaces(): Promise<Place[]> {
        return await placeRepository.find();
    }
    /*
    * Busca um lugar pelo ID.
    */

    async getPlaceById(id: string): Promise<Place | null> {
        return placeRepository.findOne({
            where: { id },
            relations: {
                event: true
            }
        }); 
    }
    /*
    * Atualiza um lugar existente.
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
    /*
    * Deleta um lugar existente.
    */

    async deletePlace(id: string): Promise<void> {

        const place = await placeRepository.findOneBy({id});

        existsValidator(place, "Place");

        await placeRepository.delete(place.id);

    }

}