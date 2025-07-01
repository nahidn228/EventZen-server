import { Request, Response, NextFunction } from "express";
import { User } from "../app/models/user.models";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Invalid authorization header format" });
      return;
    }

    const user = await User.findOne({ token });
    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Server error during authentication" });
  }
};

export default authenticate;
