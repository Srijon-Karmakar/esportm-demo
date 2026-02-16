import express from 'express';
import Player from '../models/Player.model.js';
import Club from '../models/Club.model.js';
import Manager from '../models/Manager.model.js';
import DemoRequest from '../models/DemoRequest.js';



const router = express.Router();

// GET /admin/demo-requests
router.get('/', async (_req, res) => {
    const totalPlayers = await Player.countDocuments();
    const totalClubs = await Club.countDocuments();
    const totalManagers = await Manager.countDocuments();
    const blockedUsers = await Player.countDocuments({ isBlocked: true });
  const demos = await DemoRequest.find().sort({ createdAt: -1 });


//   res.json(demos);
     res.json({
    totalUsers: totalPlayers + totalClubs + totalManagers,
    activeUsers: totalPlayers + totalClubs + totalManagers - blockedUsers, // simple example
    newThisMonth: 25, // replace with logic
    storageUsed: '321 GB',
    blockedUsers
  });
});

export default router;
