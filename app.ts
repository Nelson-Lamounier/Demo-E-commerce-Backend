import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db";

import imageRoutes from "./src/routes/gallery-images";

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
  }
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API Routes
app.use('/api', imageRoutes)

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
