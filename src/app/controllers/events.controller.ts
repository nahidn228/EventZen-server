import express, { Request, Response } from "express";
import { Event } from "../models/events.models";

export const eventsRoutes = express.Router();

eventsRoutes.post("/create-Event", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(`from body: ${body}`);

  const event = await Event.create(body);

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event,
  });
});



eventsRoutes.get("/", async (req: Request, res: Response) => {
  const Events = await Event.find();

  res.status(201).json({
    success: true,
    message: "Events retrieved successfully",
    Events,
  });
});


eventsRoutes.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const Events = await Event.findById(id);

  res.status(201).json({
    success: true,
    message: "Event Find successfully",
    Events,
  });
});


eventsRoutes.put("/:id", async (req: Request, res: Response) => {
  const EventId = req.params.id;
  const updateBody = req.body;

  const event = await Event.findByIdAndUpdate(EventId, updateBody, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: "Event update successfully",
    event,
  });
});
eventsRoutes.delete("/:id", async (req: Request, res: Response) => {
  const EventId = req.params.id;

  const event = await Event.findByIdAndDelete(EventId);

  res.status(201).json({
    success: true,
    message: "Event deleted successfully",
    event,
  });
});
