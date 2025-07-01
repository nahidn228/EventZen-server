"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_controller_1 = require("./app/controllers/user.controller");
const events_controller_1 = require("./app/controllers/events.controller");
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://eventzen-ashen.vercel.app",
    "http://localhost:5173",
];
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.use("/events", events_controller_1.eventsRoutes);
app.use("/users", user_controller_1.usersRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to EventZen Server");
});
exports.default = app;
