import { User } from "../models/User";
import { AppDataSource } from "../db_config/AppDataSource";

/*
 * Repositório TypeORM para a entidade 'User'.
 * Fornece métodos para interagir com a tabela de usuários no banco de dados.
 */
export const userRepository = AppDataSource.getRepository(User);