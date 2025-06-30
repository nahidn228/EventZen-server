import express, { Application, Request, Response } from "express";
import cors from "cors";
import { usersRoutes } from "./app/controllers/user.controller";
import { eventsRoutes } from "./app/controllers/events.controller";

const app: Application = express();
app.use(express.json());
app.use(cors());


app.use("/events", eventsRoutes);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to EventZen Server");
});

export default app;
