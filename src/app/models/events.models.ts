import { model, Schema } from "mongoose";
import { IEvents } from "../interfaces/events.interface";

const eventSchema = new Schema<IEvents>(
  {
    eventTitle: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    attendeeCount: { type: Number },
    joinedUsers: { type: [String], default: [] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Event = model("Event", eventSchema);
