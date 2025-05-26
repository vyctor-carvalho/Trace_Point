import "reflect-metadata";
import { DataSource } from "typeorm";

/**
 * @file AppDataSource.ts
 * @description Configuração da fonte de dados (DataSource) para a conexão com o banco de dados PostgreSQL utilizando TypeORM.
 * Este arquivo define os parâmetros de conexão, entidades, migrações e outras configurações do TypeORM.
 */

/**
 * @const AppDataSource
 * @description Instância do DataSource do TypeORM configurada para a aplicação.
 * Utiliza variáveis de ambiente para os detalhes da conexão com o banco de dados PostgreSQL.
 * - `synchronize: false` as migrações fazem esse trabalho.
 * - `logging: false` desabilita o log de queries SQL no console por padrão.
 * - `entities` e `migrations` apontam para os diretórios onde os modelos e migrações estão localizados.
 */
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config/EsportEnv"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: false,
    subscribers: [],
    entities: [__dirname + "/../models/*.ts"],
    migrations: [__dirname + "/../migrations/*.ts"]
});