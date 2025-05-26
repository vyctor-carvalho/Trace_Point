import { Place } from "../models/Place";
import { AppDataSource } from "../db_config/AppDataSource";

/*
 * Repositório TypeORM para a entidade 'Place'.
 * Fornece métodos para interagir com a tabela de lugares no banco de dados.
 */
export const placeRepository = AppDataSource.getRepository(Place);