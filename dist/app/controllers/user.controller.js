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
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_models_1 = require("../models/user.models");
const zod_1 = require("zod");
exports.usersRoutes = express_1.default.Router();
//ZOD validation
const createUserZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    photoURL: zod_1.z.string(),
    // age: z.number(),
    // role: z.string().optional(),
});
exports.usersRoutes.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield createUserZodSchema.parseAsync(req.body);
        console.log(body, "zod Body");
        const user = yield user_models_1.User.create(body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
exports.usersRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_models_1.User.find();
    res.status(201).json({
        success: true,
        message: "All Users retrieved successfully",
        users,
    });
}));
exports.usersRoutes.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield user_models_1.User.findById(userId);
    res.status(201).json({
        success: true,
        message: "User retrieved successfully",
        user,
    });
}));
exports.usersRoutes.delete("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const user = yield user_models_1.User.findByIdAndDelete(userId);
    res.status(201).json({
        success: true,
        message: "User Deleted successfully",
        user,
    });
}));
exports.usersRoutes.put("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const user = yield user_models_1.User.findByIdAndUpdate(userId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "User updated successfully",
        user,
    });
}));
