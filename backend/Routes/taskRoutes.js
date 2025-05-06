import express from "express";
import { adminCheck, verifyToken } from "../Middleware/Verify.js";
import {
  createTask,
  deleteTask,
  getDashboardData,
  getTaskById,
  getTasks,
  getUserDashboardData,
  updateTask,
  updateTaskStatus,
} from "../Controller/taskController.js";

const router = express.Router();

router.get("/dashboard-Data", verifyToken, adminCheck, getDashboardData);
router.get("/user-dashboard-Data", verifyToken, getUserDashboardData);
router.get("/", verifyToken, getTasks);
router.get("/:id", verifyToken, getTaskById);
router.post("/", verifyToken, adminCheck, createTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);
router.put("/status/:id", verifyToken, updateTaskStatus);

export default router;
