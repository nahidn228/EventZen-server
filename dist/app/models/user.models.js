"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: [true, "Email should be unique"],
        validate: [validator_1.default.isEmail, "invalid email sent {VALUE}"],
    },
    password: {
        type: String,
        required: true,
    },
    photoURL: {
        type: String,
        required: [true, "Please give a photo URL"],
    },
    token: { type: String, required: false },
    // age: {
    //   type: Number,
    //   required: true,
    //   min: [18, "Minimum age should be atleast 18"],
    //   max: 60,
    // },
    // role: {
    //   type: String,
    //   enum: {
    //     values: ["USER", "ADMIN", "SUPERADMIN"],
    //     message: "Role should be USER ADMIN and SUPERADMIN... ",
    //   },
    //   default: "USER",
    //   uppercase: true,
    // },
    // address: {
    //   city: { type: String },
    //   street: { type: String },
    //   zip: { type: Number },
    // },
}, {
    versionKey: false,
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
