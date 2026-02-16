// import express from 'express';
// import Notification from '../models/Notification.model.js';
// import { protectPlayer } from '../utils/authPlayer.js';
// import { protectManager } from '../utils/authManager.js';
// import { protectCoach } from '../utils/authCoach.js';

// const router = express.Router();

// router.get('/player', protectPlayer, async (req, res) => {
//   const list = await Notification.find({ userType: 'player', user: req.user._id }).sort({ createdAt: -1 }).limit(100);
//   res.json(list);
// });

// router.get('/manager', protectManager, async (req, res) => {
//   const list = await Notification.find({ userType: 'manager', user: req.user._id }).sort({ createdAt: -1 }).limit(100);
//   res.json(list);
// });

// router.get('/coach', protectCoach, async (req, res) => {
//   const list = await Notification.find({ userType: 'coach', user: req.user._id }).sort({ createdAt: -1 }).limit(100);
//   res.json(list);
// });

// router.post('/:id/read', async (req, res) => {
//   // optionally protect per-role, omitted for brevity
//   await Notification.findByIdAndUpdate(req.params.id, { read: true });
//   res.json({ ok: true });
// });

// export default router;
