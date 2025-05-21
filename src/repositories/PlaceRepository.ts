import { Place } from "../models/Place";
import { AppDataSource } from "../db_config/AppDataSource";

export const placeRepository = AppDataSource.getRepository(Place);