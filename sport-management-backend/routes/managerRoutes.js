import express from 'express';
import { signupManager, loginManager } from '../controllers/ManagerControllers.js';

const router = express.Router();

router.post('/signup', signupManager);
router.post('/login', loginManager);

export default router;