import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://portfolio-manager-cms.vercel.app",
  "http://localhost:5173",
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`Blocked CORS request from: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

// MongoDB connection
const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    return;
  }

  try {
    const res = await mongoose.connect(MONGO_URI);
    if (res) console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};
connectToDatabase();

// Home Page Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routes
import projectRoutes from "./routes/projectRoutes.js";
app.use("/api/projects", projectRoutes);

import skillRoutes from "./routes/skillRoute.js";
app.use("/api/skills", skillRoutes);

import categoryRoutes from "./routes/categoryRoutes.js";
app.use("/api/categories", categoryRoutes);

import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/admin", adminRoutes);

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

// Listening to port
app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
