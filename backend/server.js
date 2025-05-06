import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://task-tify.vercel.app"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Task Management API 🚀");
});

// routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

// database connection
mongoose.connect(`${process.env.MONGO}`);
const db = mongoose.connection;

db.on("open", () => {
  console.log("Database connected..!");
});
db.on("error", () => {
  console.log("Failed to connect Database");
});

const port = process.env.PORT || 4000

// listening to server
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
