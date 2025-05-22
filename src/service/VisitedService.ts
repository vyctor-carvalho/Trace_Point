
import { VisitedDOT } from "../DTO/VisitedDTO";
import { UserService } from "../service/UserService";
import { PlaceService } from "../service/PlaceService";
import { VisitedPlaces } from "../models/VisitedPlaces";
import { visitedPlacesRepository } from "../repositories/VisitedRepository";
import validateDTO from "../utils/validateDTO";
import existsValidator from "../utils/ExistsValidator";

export class visitedService {

    private userService = new UserService();

    private placeService = new PlaceService();
    
    async postVisit(visitedDTO: VisitedDOT): Promise<VisitedPlaces> {

        await validateDTO(visitedDTO);

        const user = await this.userService.getUserById(visitedDTO.userId);

        existsValidator(user, "User");

        const place = await this.placeService.getPlaceById(visitedDTO.placeId);

        existsValidator(place, "Place");

        const newVisited = visitedPlacesRepository.create({
            visitDate: visitedDTO.visitDate,
            user: user,
            place: place
        });

        return await visitedPlacesRepository.save(newVisited);

    }

    async getVesits(): Promise<VisitedPlaces[]> {
        return await visitedPlacesRepository.find();
    }

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

    async putVisit(visitedDTO: VisitedDOT): Promise<VisitedPlaces> {

        await validateDTO(visitedDTO);

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