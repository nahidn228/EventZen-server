import express, { Request, Response } from "express";
import { User } from "../models/user.models";
import { z } from "zod";
import bcrypt from "bcrypt";

export const usersRoutes = express.Router();

//ZOD validation
const createUserZodSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  photoURL: z.string(),
  // age: z.number(),
  // role: z.string().optional(),
});

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await createUserZodSchema.parseAsync(req.body);
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      ...body,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

usersRoutes.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const token = Math.random().toString(36).substring(2);

    user.token = token;
    await user.save();

    res.status(201).json({
      success: true,
      message: "All Users retrieved successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error,
    });
  }
});

usersRoutes.get("/current-user", async (req: Request, res: Response) => {
  const email = req.query.email as string;

  try {
    const data = await User.find({ email });
    res.status(200).json({
      success: true,
      message: "Current User retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Current User",
      error,
    });
  }
});

usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "User Deleted successfully",
    user,
  });
});

usersRoutes.put("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});
