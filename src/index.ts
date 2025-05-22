import server from './sever';
import { PORT } from "./config/EsportEnv";
import { errorsHandler } from "./middleware/ErrorsHandler"
import { AppDataSource } from './db_config/AppDataSource';

// 🔹 Arquivo principal

const port = PORT;


server.get('/', (req, res) => {
  res.send('Hello, world!');
});

server.use(errorsHandler);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});