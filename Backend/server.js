// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App setup
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
