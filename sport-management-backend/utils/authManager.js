// // utils/authManager.js
// import jwt from "jsonwebtoken";
// import Manager from "../models/Manager.model.js";

// export const protectManager = async (req, res, next) => {
//   try {
//     const auth = req.headers.authorization || "";
//     const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const manager = await Manager.findById(decoded.id);
//     if (!manager) return res.status(401).json({ message: "Invalid token" });

//     req.user = manager;
//     next();
//   } catch (e) {
//     res.status(401).json({ message: "Unauthorized (Manager)" });
//   }
// };















// src/utils/authManager.js
import jwt from "jsonwebtoken";
import Manager from "../models/Manager.model.js";

export const protectManager = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "No token" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Manager.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
