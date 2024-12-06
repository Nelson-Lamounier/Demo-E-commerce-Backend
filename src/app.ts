import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import Stripe from "stripe"
import './controllers/auth-controller/passport-config'


import imageRoutes from "./routes/gallery-images";
import authRoutes from "./routes/auth/auth-routes"
import paymentIntent  from "./routes/stripe-payment"


// Load environment variables
dotenv.config({ path: ".env" });

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS
? process.env.ALLOWED_ORIGINS.split(",")
: [];

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Initialize Passport
app.use(passport.initialize());


//CORS Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string | undefined;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT, PATCH, POST, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }
  next();
});



// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//     allowedHeaders: ['Content-Type', "Authorization"]
//   })
// );

// API Routes
app.use('/api', imageRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', paymentIntent)

app.get("/", (req, res) => {
  res.send("API is running");
  
});
// dropIndex();

console.log('Allowed Origins:', allowedOrigins);
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


