// const Coach = require('../models/Coach.model.js');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   try {
//     const coach = new Coach(req.body);
//     await coach.save();
//     res.status(201).json({ message: 'Coach registered successfully' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const coach = await Coach.findOne({ email });
//     if (!coach) return res.status(404).json({ message: 'Coach not found' });

//     const isMatch = await coach.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: coach._id, role: 'coach' }, 'your_secret_key', { expiresIn: '7d' });

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       coach: { name: coach.name, email: coach.email },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



import Coach from '../models/Coach.model.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const coach = new Coach(req.body);
    await coach.save();
    res.status(201).json({ message: 'Coach registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const coach = await Coach.findOne({ email });
    if (!coach) return res.status(404).json({ message: 'Coach not found' });

    const isMatch = await coach.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: coach._id, role: 'coach' }, 'your_secret_key', { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      coach: { name: coach.name, email: coach.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
