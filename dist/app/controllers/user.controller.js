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
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
        const user = yield user_models_1.User.create(Object.assign(Object.assign({}, body), { password: hashedPassword }));
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
exports.usersRoutes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_models_1.User.findOne({ email });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        const token = Math.random().toString(36).substring(2);
        user.token = token;
        yield user.save();
        res.status(201).json({
            success: true,
            message: "All Users retrieved successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Login failed",
            error,
        });
    }
}));
exports.usersRoutes.get("/current-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        const data = yield user_models_1.User.find({ email });
        res.status(200).json({
            success: true,
            message: "Current User retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve Current User",
            error,
        });
    }
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
