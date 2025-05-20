import express from 'express';

import server from './sever'; "./sever"
import { PORT } from "./config/EsportEnv";

const port = PORT;

server.get('/', (req, res) => {
  res.send('Home Page');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});