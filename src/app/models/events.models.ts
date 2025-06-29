import { model, Schema } from "mongoose";
import { IEvents } from "../interfaces/events.interface";

const eventSchema = new Schema<IEvents>(
  {
    eventTitle: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    description: { type: String },
    attendeeCount: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Event = model("Event", eventSchema);
