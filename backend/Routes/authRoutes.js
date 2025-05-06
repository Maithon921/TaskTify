import express from "express";
import {
  getUser,
  login,
  registerUser,
  updateUser,
} from "../Controller/authController.js";
import { verifyToken } from "../Middleware/Verify.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/getuser", verifyToken, getUser);
router.put("/updateuser", verifyToken, updateUser);

export default router;
