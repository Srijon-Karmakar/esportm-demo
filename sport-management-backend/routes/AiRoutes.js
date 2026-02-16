// routes/aiRoutes.js
import express from 'express';
import multer from 'multer';
import {
  recommendPlayer,
  analyzeHealth,
  recommendTransfers,
  generateSchedule,
} from '../controllers/ai.controller.js';
import { protectClub } from '../utils/authClub.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 6 * 1024 * 1024 } });

// 1) Player recommendation (name and/or image). Public for now.
router.post('/players/recommend', upload.single('image'), recommendPlayer);

// 2) Player health (requires club auth)
router.post('/players/health', protectClub, analyzeHealth);

// 3) Buy/Sell recommendations (requires club auth)
router.post('/transfers/recommend', protectClub, recommendTransfers);

// 4) AI schedule engine (requires club auth)
router.post('/schedule/generate', protectClub, generateSchedule);

export default router;
