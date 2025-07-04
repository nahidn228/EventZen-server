"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    eventTitle: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    attendeeCount: { type: Number },
    joinedUsers: { type: [String], default: [] },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Event = (0, mongoose_1.model)("Event", eventSchema);
