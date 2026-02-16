// const express = require('express');
// const router = express.Router();
// const coachController = require('../controllers/coach.controller.js');

// router.post('/signup', coachController.signup);
// router.post('/login', coachController.login);

// module.exports = router;



import express from 'express';
import { signup, login } from '../controllers/coach.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
