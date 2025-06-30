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
const dayjs_1 = __importDefault(require("dayjs"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const zod_1 = require("zod");
dayjs_1.default.extend(isBetween_1.default);
exports.eventsRoutes = express_1.default.Router();
//ZOD validation
const createEventZodSchema = zod_1.z.object({
    eventTitle: zod_1.z.string(),
    eventDate: zod_1.z.string(),
    name: zod_1.z.string(),
    attendeeCount: zod_1.z.number(),
    location: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.eventsRoutes.post("/create-Event", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield createEventZodSchema.parseAsync(req.body);
    console.log(`from body: ${body}`);
    const data = yield events_models_1.Event.create(body);
    res.status(201).json({
        success: true,
        message: "Event created successfully",
        data,
    });
}));
// eventsRoutes.get("/", async (req: Request, res: Response) => {
//   const Events = await Event.find();
//   res.status(201).json({
//     success: true,
//     message: "Events retrieved successfully",
//     Events,
//   });
// });
exports.eventsRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, dateFilter, sortBy = "createdAt", sort = "asc", limit = "10", } = req.query;
        const filterCondition = {};
        if (filter) {
            filterCondition.eventTitle = {
                $regex: new RegExp(filter.toString(), "i"),
            };
        }
        const today = (0, dayjs_1.default)().startOf("day");
        let startDate = null;
        let endDate = null;
        if (dateFilter === "today") {
            startDate = today.toDate();
            endDate = (0, dayjs_1.default)(today).endOf("day").toDate();
        }
        else if (dateFilter === "current-week") {
            startDate = (0, dayjs_1.default)().startOf("week").toDate();
            endDate = (0, dayjs_1.default)().endOf("week").toDate();
        }
        else if (dateFilter === "last-week") {
            startDate = (0, dayjs_1.default)().subtract(1, "week").startOf("week").toDate();
            endDate = (0, dayjs_1.default)().subtract(1, "week").endOf("week").toDate();
        }
        else if (dateFilter === "current-month") {
            startDate = (0, dayjs_1.default)().startOf("month").toDate();
            endDate = (0, dayjs_1.default)().endOf("month").toDate();
        }
        else if (dateFilter === "last-month") {
            startDate = (0, dayjs_1.default)().subtract(1, "month").startOf("month").toDate();
            endDate = (0, dayjs_1.default)().subtract(1, "month").endOf("month").toDate();
        }
        if (startDate && endDate) {
            filterCondition.eventDate = { $gte: startDate, $lte: endDate };
        }
        const sortCondition = {};
        sortCondition[sortBy.toString()] = sort === "desc" ? -1 : 1;
        const data = yield events_models_1.Event.find(filterCondition)
            .sort(sortCondition)
            .limit(Number(limit));
        res.status(200).send({
            success: true,
            message: "Events retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to retrieve events",
            error,
        });
    }
}));
exports.eventsRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield events_models_1.Event.findById(id);
    res.status(201).json({
        success: true,
        message: "Event Find successfully",
        data,
    });
}));
exports.eventsRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    const updateBody = req.body;
    const data = yield events_models_1.Event.findByIdAndUpdate(eventId, updateBody, {
        new: true,
    });
    res.status(201).json({
        success: true,
        message: "Event update successfully",
        data,
    });
}));
exports.eventsRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    const data = yield events_models_1.Event.findByIdAndDelete(eventId);
    res.status(201).json({
        success: true,
        message: "Event deleted successfully",
        data,
    });
}));
