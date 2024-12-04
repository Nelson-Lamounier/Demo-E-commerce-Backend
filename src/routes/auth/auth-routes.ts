import express from "express"
import {signUp} from "../../controllers/auth-controller/sign-up-email"
import {signIn} from "../../controllers/auth-controller/sign-in-email"
import { logout } from "../../controllers/auth-controller/logout";
import { googleSignIn } from "../../controllers/auth-controller/sign-in-with-google";

import { getCurrentUser } from "../../controllers/auth-controller/get-current-user";

import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router();

// Use router.post for handling POST requests
router.post('/signup', signUp);
router.get("/current-user", getCurrentUser); // Add the new route

router.post('/signin', signIn);

router.post('/google/login', googleSignIn)

// Initiate Google Authentication
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// Google OAuth Callback
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res, next) => {
    try {
      const user = req.user as any;
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
      // Securely send the token
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      });
      res.redirect('http://localhost:3000/');
    } catch (error) {
      next(error);
    }
  });

  router.post("/logout", logout);
  
  export default router;

