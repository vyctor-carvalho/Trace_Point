import server from './sever';
import { PORT } from "./config/EsportEnv";
import { errorsHandler } from "./middleware/ErrorsHandler";
import { authRoutes } from "./routes/AuthRoutes";
import { userRouter } from "./routes/UserRoutes";
import { eventRouter } from "./routes/EventRoutes";
import { placeRouter } from "./routes/PlaceRoutes";
import { visitedRoutes } from "./routes/VisitedRoutes";
import { logger } from "./utils/logger";

/**
 * @file index.ts
 * @description Arquivo principal da aplicação (entry point).
 * Configura e inicia o servidor Express, registra as rotas da API
 * e o middleware de tratamento de erros.
 */

const port = PORT

// Rota raiz para verificação de funcionamento
server.get('/', (req, res) => {
  res.send('<h1>Trace Point API</h1><p>Bem-vindo à API do Trace Point!</p>');
});

// Configuração das rotas da aplicação
server.use("/auth", authRoutes);
server.use("/user", userRouter);
server.use("/event", eventRouter);
server.use("/place", placeRouter);
server.use("/visited", visitedRoutes);

// Middleware para tratamento de erros global
// Deve ser o último middleware a ser adicionado com server.use()
server.use(errorsHandler);

// Inicia o servidor na porta especificada
server.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});