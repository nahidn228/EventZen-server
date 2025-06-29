import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";
import validator from "validator";

const userSchema = new Schema<IUser>({
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
    validate: [validator.isEmail, "invalid email sent {VALUE}"],
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

export const User = model("User", userSchema);
