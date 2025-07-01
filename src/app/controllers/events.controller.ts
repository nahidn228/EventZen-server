import express, { Request, Response } from "express";
import { Event } from "../models/events.models";
import { SortOrder } from "mongoose";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { z } from "zod";
import authenticate from "../../middlewares/authenticate";

dayjs.extend(isBetween);

export const eventsRoutes = express.Router();

//ZOD validation
const createEventZodSchema = z.object({
  eventTitle: z.string(),
  eventDate: z.string(),
  name: z.string(),
  email: z.string(),
  attendeeCount: z.number(),
  location: z.string(),
  description: z.string(),
  joinedUsers: z.array(z.string()).optional().default([]),
});

eventsRoutes.post(
  "/create-Event",
  authenticate,
  async (req: Request, res: Response) => {
    const body = await createEventZodSchema.parseAsync(req.body);
    console.log(`from body: ${body}`);

    const data = await Event.create(body);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data,
    });
  }
);

// eventsRoutes.get("/", async (req: Request, res: Response) => {
//   const Events = await Event.find();

//   res.status(201).json({
//     success: true,
//     message: "Events retrieved successfully",
//     Events,
//   });
// });

eventsRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      dateFilter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "12",
    } = req.query;

    const filterCondition: Record<string, unknown> = {};

    if (filter) {
      filterCondition.eventTitle = {
        $regex: new RegExp(filter.toString(), "i"),
      };
    }

    const today = dayjs().startOf("day");
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (dateFilter === "today") {
      startDate = today.toDate();
      endDate = dayjs(today).endOf("day").toDate();
    } else if (dateFilter === "current-week") {
      startDate = dayjs().startOf("week").toDate();
      endDate = dayjs().endOf("week").toDate();
    } else if (dateFilter === "last-week") {
      startDate = dayjs().subtract(1, "week").startOf("week").toDate();
      endDate = dayjs().subtract(1, "week").endOf("week").toDate();
    } else if (dateFilter === "current-month") {
      startDate = dayjs().startOf("month").toDate();
      endDate = dayjs().endOf("month").toDate();
    } else if (dateFilter === "last-month") {
      startDate = dayjs().subtract(1, "month").startOf("month").toDate();
      endDate = dayjs().subtract(1, "month").endOf("month").toDate();
    }

    if (startDate && endDate) {
      filterCondition.eventDate = { $gte: startDate, $lte: endDate };
    }

    const sortCondition: Record<string, SortOrder> = {};
    sortCondition[sortBy.toString()] = sort === "desc" ? -1 : 1;

    const data = await Event.find(filterCondition)
      .sort(sortCondition)
      .limit(Number(limit));

    res.status(200).send({
      success: true,
      message: "Events retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve events",
      error,
    });
  }
});

eventsRoutes.get(
  "/my-event",
  authenticate,
  async (req: Request, res: Response) => {
    const email = req.query.email as string;

    try {
      const data = await Event.find({ email });
      res.status(200).json({
        success: true,
        message: "My events retrieved successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve events",
        error,
      });
    }
  }
);

eventsRoutes.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await Event.findById(id);

  res.status(201).json({
    success: true,
    message: "Event Find successfully",
    data,
  });
});

eventsRoutes.put("/:id", async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const updateBody = req.body;

  const data = await Event.findByIdAndUpdate(eventId, updateBody, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: "Event update successfully",
    data,
  });
});

eventsRoutes.put(
  "/join/:id",
  authenticate,
  async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const userEmail = (req as any).user.email;

    try {
      const event = await Event.findById(eventId);
      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      if (!event.joinedUsers) {
        event.joinedUsers = [];
      }

      if (event.joinedUsers.includes(userEmail)) {
        res
          .status(400)
          .json({ message: "You have already joined this event." });
        return;
      }

      event.joinedUsers.push(userEmail);
      event.attendeeCount += 1;

      await event.save();

      res.status(200).json({
        success: true,
        message: "Successfully joined event",
        data: event,
      });
    } catch (error) {
      console.error("Join event error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

eventsRoutes.delete("/:id", async (req: Request, res: Response) => {
  const eventId = req.params.id;

  const data = await Event.findByIdAndDelete(eventId);

  res.status(201).json({
    success: true,
    message: "Event deleted successfully",
    data,
  });
});
