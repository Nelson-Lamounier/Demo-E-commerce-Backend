import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../model/user";
import dotenv from "dotenv";

dotenv.config();

// Function to handle user sign-up
export const signUp: RequestHandler = async (req, res, next) => {
  try {
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body); // Add this line
    // Extract user input from the request body
    const { username, email, password, receiveEmails } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(409)
        .json({ message: "Email is already registered. Please log in" });
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user Instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      receiveEmails: receiveEmails || false, // Set receiveEmails, default to false if undefined
    });
    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    // Response with success message and token
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        receiveEmails: newUser.receiveEmails,
      },
    });
  } catch (error) {
    console.error("Sign-Up Error", error);
    next(error);
  }
};
