import express from 'express';
import { registerPhysio, loginPhysio } from '../controllers/PhysioController.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerPhysio);
router.post('/signup', registerPhysio); 
router.post('/login', loginPhysio);

router.get('/dashboard', auth, authorizeRoles('physio'), (req, res) => {
    res.json({ message: 'Welcome to Physio Dashboard' });
  });

export default router;
