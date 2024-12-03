import { OAuth2Client } from "google-auth-library";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../model/user";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignIn: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      res.status(400).json({ message: "Invalid Google token" });
      return;
    }

    const { sub, email, name } = payload;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });

    if (!user) {
      // User doesn't exist; create a new user
      const username = name 
      const googleId = sub;

      user = await User.create({
        googleId,
        email,
        username,
        receiveEmails: false,
      });
    } else {
      // User exists; update the googleId if it is missing
      if (!user.googleId) {
        user.googleId = sub;
        await user.save();
      }
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Google sign-in successful",
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    next(error);
  }
};