import server from './sever';
import { PORT } from "./config/EsportEnv";
import { errorsHandler } from "./middleware/ErrorsHandler";
import { authRoutes } from "./routes/AuthRoutes";
import { userRouter } from "./routes/UserRoutes";
import { eventRouter } from "./routes/EventRoutes";
import { placeRouter } from "./routes/PlaceRoutes";
import { visitedRoutes } from "./routes/VisitedRoutes";

// 🔹 Arquivo principal

const port = PORT

server.get('/', (req, res) => {
  res.send('<h1>Home page</h1>');
});

server.use("/auth", authRoutes);

server.use("/user", userRouter);

server.use("/event", eventRouter);

server.use("/place", placeRouter);

server.use("/visited", visitedRoutes);

server.use(errorsHandler);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});