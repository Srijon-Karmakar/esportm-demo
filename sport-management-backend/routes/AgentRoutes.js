import express from 'express';
import { registerAgent, loginAgent } from '../controllers/agent.controller.js';

const router = express.Router();

router.post('/register', registerAgent);
router.post('/login', loginAgent);

export default router;
