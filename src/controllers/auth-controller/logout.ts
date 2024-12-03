import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Simulating a token blacklist with expiration tracking
const blacklistedTokens = new Map<string, number>(); // Map of token to expiration timestamp

// Logout controller
export const logout: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(400).json({ message: "Token not provided" });
      return; // Ensure the function does not continue execution
    }

    // Decode the token to get expiration time
    const decodedToken = jwt.decode(token) as { exp?: number };
    if (!decodedToken?.exp) {
      res.status(400).json({ message: "Invalid token" });
      return; // Ensure the function does not continue execution
    }

    // Add token to blacklist with expiration time
    blacklistedTokens.set(token, decodedToken.exp * 1000); // Convert `exp` to milliseconds

    res.status(200).json({ message: "Logged out successfully" });
    return; // Explicitly indicate the function ends here
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Logout failed" });
    return; // Explicitly indicate the function ends here
  }
};

// Helper function to check if a token is blacklisted
export const isTokenBlacklisted: (token: string) => boolean = (token) => {
  const expiryTime = blacklistedTokens.get(token);
  if (!expiryTime) return false;

  // Remove token from blacklist if it's expired
  if (expiryTime < Date.now()) {
    blacklistedTokens.delete(token);
    return false;
  }
  return true;
};