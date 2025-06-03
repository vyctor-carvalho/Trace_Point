import express from 'express';
import { AppDataSource } from "./db_config/AppDataSource";
import { logger } from "./utils/logger";

/**
 * @file server.ts
 * @description Configuração e inicialização do servidor Express e da conexão com o banco de dados.
 * Este módulo exporta a instância do servidor Express configurada.
 */

const server = express();

// Middleware para parsear o corpo das requisições JSON
server.use(express.json());

/**
 * Inicializa a conexão com o banco de dados usando TypeORM (AppDataSource).
 * Registra no console o sucesso ou falha da inicialização.
 */
AppDataSource.initialize()
    .then(() => {
        logger.info("Database initialized");
    })
    .catch((error) => {
        logger.error(`Error initializing database: ${error.message}`);
    })

export default server