import express from 'express';

import { AppDataSource } from "./db_config/AppDataSource"

const server = express();

server.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Database initialized");
    })
    .catch((error) => {
        console.error(`Error initializing database`);
    })

export default server