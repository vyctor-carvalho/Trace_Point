import { Event } from "../models/Event";
import { AppDataSource } from "../db_config/AppDataSource";

/*
 * Repositório TypeORM para a entidade 'Event'.
 * Fornece métodos para interagir com a tabela de eventos no banco de dados.
 */
export const eventRepository = AppDataSource.getRepository(Event);