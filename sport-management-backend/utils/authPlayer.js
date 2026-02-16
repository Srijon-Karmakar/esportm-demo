// // utils/authPlayer.js
// import jwt from 'jsonwebtoken';
// import Player from '../models/Player.model.js';

// export const protectPlayer = async (req, res, next) => {
//   try {
//     const auth = req.headers.authorization || '';
//     const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const player = await Player.findById(decoded.id);
//     if (!player) return res.status(401).json({ message: 'Invalid token' });

//     req.user = player;
//     next();
//   } catch (e) {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };














// // src/utils/authPlayer.js
// import jwt from "jsonwebtoken";
// import Player from "../models/Player.model.js";

// export const protectPlayer = async (req, res, next) => {
//   try {
//     const header = req.headers.authorization || "";
//     const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
//     if (!token) return res.status(401).json({ message: "No token" });
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await Player.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: "Invalid token" });
//     req.user = user; // keep full doc for controllers
//     next();
//   } catch (e) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };












// // utils/authPlayer.js
// import jwt from 'jsonwebtoken';
// import Player from '../models/Player.model.js';

// export const protectPlayer = async (req, res, next) => {
//   try {
//     const auth = req.headers.authorization || '';
//     const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const player = await Player.findById(decoded.id);
//     if (!player) return res.status(401).json({ message: 'Player not found' });

//     req.player = player;
//     next();
//   } catch (e) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

















// utils/authPlayer.js
import jwt from 'jsonwebtoken';
import Player from '../models/Player.model.js';

export const protectPlayer = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const player = await Player.findById(decoded.id);
    if (!player) return res.status(401).json({ message: 'Player not found' });

    // 🔑 main line: keep everything using req.user
    req.user = player;

    // (optional) keep req.player for future use
    req.player = player;

    next();
  } catch (e) {
    console.error("protectPlayer error:", e);
    return res.status(401).json({ message: 'Invalid token' });
  }
};


