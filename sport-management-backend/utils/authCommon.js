// utils/authCommon.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Player from '../models/Player.model.js';
import Manager from '../models/Manager.model.js';

dotenv.config();

export const protectPlayerOrManager = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization || '';
    if (!authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Not authorized, no token' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return res.status(401).json({ message: 'Invalid token payload' });

    // Try Player first, then Manager
    let user = await Player.findById(decoded.id).select('-password');
    let role = null;

    if (user) {
      role = 'Player';
    } else {
      user = await Manager.findById(decoded.id).select('-password').populate('club');
      if (user) role = 'Manager';
    }

    if (!user || !role) return res.status(401).json({ message: 'User not found for this token' });

    req.user = user;
    req.role = role; // 'Player' | 'Manager'
    next();
  } catch (err) {
    console.error('protectPlayerOrManager error:', err);
    return res.status(401).json({ message: 'Not authorized' });
  }
};
