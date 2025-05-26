import express from "express"
import server from "./sever";
import { PORT } from "./config/EsportEnv";
import { errorsHandler } from "./middleware/ErrorsHandler";
import { authRoutes } from "./routes/AuthRoutes";
import { userRouter } from "./routes/UserRoutes";
import { eventRouter } from "./routes/EventRoutes";
import { placeRouter } from "./routes/PlaceRoutes";
import { visitedRoutes } from "./routes/VisitedRoutes";
import path from 'path';

/**
 * @file index.ts
 * @description Arquivo principal da aplicação (entry point).
 * Configura e inicia o servidor Express, registra as rotas da API
 * e o middleware de tratamento de erros.
 */

const port = PORT


server.use(express.static(path.join(process.cwd(), 'public')));

// Rota raiz para verificação de funcionamento
server.get('/', (req, res) => {
  // Constrói o caminho absoluto para o arquivo HTML
  // process.cwd() retorna o diretório de trabalho atual do processo Node.js
  // Assumindo que a pasta 'public' está na raiz do seu projeto
  const filePath = path.join(process.cwd(), 'public', 'index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Erro ao enviar o arquivo HTML:", err);
      // Envie uma resposta de erro genérica ou trate o erro de forma mais específica
      res.status((err as any).status || 500).send("Erro ao carregar a página.");
    }
  });
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
  console.log(`Server is running on http://localhost:${port}`);
});