import { VisitedPlaces } from "../models/VisitedPlaces";
import { AppDataSource } from "../db_config/AppDataSource";

/*
 * Repositório TypeORM para a entidade 'VisitedPlaces'.
 * Fornece métodos para interagir com a tabela de lugares visitados no banco de dados.
 */
export const visitedPlacesRepository = AppDataSource.getRepository(VisitedPlaces);