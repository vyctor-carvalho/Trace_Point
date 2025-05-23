import server from './sever';
import { PORT } from "./config/EsportEnv";
import { errorsHandler } from "./middleware/ErrorsHandler"

// 🔹 Arquivo principal

const port = PORT;


server.get('/', (req, res) => {
  res.send('<h1>Home page</h1>');
});

server.use(errorsHandler);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});