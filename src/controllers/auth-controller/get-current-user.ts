import jwt from "jsonwebtoken";
import User from "../../model/user";
import { RequestHandler } from "express";

export const getCurrentUser: RequestHandler = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ message: "Token not provided" });
        return; // Explicit return
      }
  
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
      const user = await User.findById(decodedToken.userId).select("-password");
  
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return; // Explicit return
      }
  
      res.status(200).json({ user });
      return; // Explicit return
    } catch (error) {
      next(error); // No need to return here; next() is void
    }
  };