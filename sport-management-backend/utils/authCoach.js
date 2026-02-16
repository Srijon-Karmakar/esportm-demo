// utils/authCoach.js
import jwt from "jsonwebtoken";
import Coach from "../models/Coach.model.js";

export const protectCoach = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const coach = await Coach.findById(decoded.id);
    if (!coach) return res.status(401).json({ message: "Invalid token" });

    req.user = coach;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized (Coach)" });
  }
};
