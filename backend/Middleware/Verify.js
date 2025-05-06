import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } else {
      res.status(401).json({ message: "Invalid or No Token" });
    }
  } catch (err) {
    res
      .status(401)
      .json({ message: "Token verification failed", error: err.message });
  }
};

export const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access Denied, You are not an admin" });
  }
};
