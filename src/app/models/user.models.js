"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: [true, "Email should be unique"],
        // validate: {
        //   validator: function (value) {
        //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        //   },
        //   message: (props) => `${props.value} is not a valid email!`,
        // },
        validate: [validator_1.default.isEmail, "invalid email sent {VALUE}"],
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Minimum age should be atleast 18"],
        max: 60,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ["USER", "ADMIN", "SUPERADMIN"],
            message: "Role should be USER ADMIN and SUPERADMIN... ",
        },
        default: "USER",
        uppercase: true,
    },
    address: {
        city: { type: String },
        street: { type: String },
        zip: { type: Number },
    },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
