import express, { Application, Request, Response } from "express";
import cors from "cors";
import { usersRoutes } from "./app/controllers/user.controller";
import { eventsRoutes } from "./app/controllers/events.controller";

const app: Application = express();

const allowedOrigins = [
  "https://eventzen-ashen.vercel.app",
  "http://localhost:5173",
];

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/events", eventsRoutes);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to EventZen Server");
});

export default app;
