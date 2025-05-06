import express from "express";
import { adminCheck, verifyToken } from "../Middleware/Verify.js";

import {
  deleteUser,
  getAllUsers,
  getUserById,
} from "../Controller/userController.js";

const router = express.Router();

router.get("/", verifyToken, adminCheck, getAllUsers);
router.get("/getUser/:id", verifyToken, getUserById);
router.delete("/delete/:id", verifyToken, adminCheck, deleteUser);

export default router;
