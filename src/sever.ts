/*
 * Configuração do servidor Express e inicialização do banco de dados.
 */
import express from 'express';

import { AppDataSource } from "./db_config/AppDataSource"

const server = express();

/*
 * Inicializa a conexão com o banco de dados.
 * 
 * Exibe uma mensagem de sucesso se a inicialização for bem-sucedida.
 * Exibe uma mensagem de erro se houver falha na inicialização.
 */

server.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Database initialized");
    })
    .catch((error) => {
        console.error(`Error initializing database ${error.get.message}`);
    })

export default server