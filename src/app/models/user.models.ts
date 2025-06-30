import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";
import validator from "validator";

const userSchema = new Schema<IUser>(
  {
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
      validate: [validator.isEmail, "invalid email sent {VALUE}"],
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("User", userSchema);
