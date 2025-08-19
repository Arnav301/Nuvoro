import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// ✅ CORS must allow credentials + your frontend Vercel URL
app.use(
  cors({
    origin: [
      "https://nuvoro-eight.vercel.app", // frontend on Vercel
      "http://localhost:5173",           // dev mode
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // allow sending cookies
  })
);

// ✅ Middleware order matters
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Handle OPTIONS preflight requests (important for cookies in cross-origin)
app.options("*", cors());

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  connectDB();
});
