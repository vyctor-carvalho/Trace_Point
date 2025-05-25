import { plainToInstance } from "class-transformer";

import { Place } from "../models/Place";
import { PlaceDTO } from "../DTO/PlaceDTO";
import { placeRepository } from "../repositories/PlaceRepository";
import existsValidator from "../utils/ExistsValidator";
import validateRequestBody from "../utils/ValidateRequestBody";
import { Address } from "../models/wrappers/Address";


export class PlaceService {

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

    async getPlaces(): Promise<Place[]> {
        return await placeRepository.find();
    }

    async getPlaceById(id: string): Promise<Place | null> {
        return placeRepository.findOne({
            where: { id },
            relations: {
                event: true
            }
        }); 
    }

    async putPlace(id: string, placeDTO: PlaceDTO): Promise<Place> {

        await validateRequestBody(placeDTO);

        const place = await placeRepository.findOneBy({id});

        existsValidator(place, "Place"); 

        place.name = placeDTO.name;
        place.type = placeDTO.type;
        place.address = plainToInstance(Address, placeDTO.address);

        return placeRepository.save(place);

    }

    async deletePlace(id: string): Promise<void> {

        const place = await placeRepository.findOneBy({id});

        existsValidator(place, "Place");

        await placeRepository.delete(place.id);

    }

}