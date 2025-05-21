import { VisitedPlaces } from "../models/VisitedPlaces";
import { AppDataSource } from "../db_config/AppDataSource";

export const visitedPlacesRepository = AppDataSource.getRepository(VisitedPlaces);