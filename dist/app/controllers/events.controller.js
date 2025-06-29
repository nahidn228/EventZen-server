"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const events_models_1 = require("../models/events.models");
exports.eventsRoutes = express_1.default.Router();
exports.eventsRoutes.post("/create-Event", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(`from body: ${body}`);
    const event = yield events_models_1.Event.create(body);
    res.status(201).json({
        success: true,
        message: "Event created successfully",
        event,
    });
}));
exports.eventsRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Events = yield events_models_1.Event.find();
    res.status(201).json({
        success: true,
        message: "Events retrieved successfully",
        Events,
    });
}));
exports.eventsRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const Events = yield events_models_1.Event.findById(id);
    res.status(201).json({
        success: true,
        message: "Event Find successfully",
        Events,
    });
}));
exports.eventsRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const EventId = req.params.id;
    const updateBody = req.body;
    const event = yield events_models_1.Event.findByIdAndUpdate(EventId, updateBody, {
        new: true,
    });
    res.status(201).json({
        success: true,
        message: "Event update successfully",
        event,
    });
}));
exports.eventsRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const EventId = req.params.id;
    const event = yield events_models_1.Event.findByIdAndDelete(EventId);
    res.status(201).json({
        success: true,
        message: "Event deleted successfully",
        event,
    });
}));
