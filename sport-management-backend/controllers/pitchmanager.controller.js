import PitchManager from '../models/PitchManager.model.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const pitchManager = new PitchManager(req.body);
    await pitchManager.save();
    res.status(201).json({ message: 'Pitch Manager registered successfully. Please Login to Proceed' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pitchManager = await PitchManager.findOne({ email });
    if (!pitchManager) return res.status(404).json({ message: 'Pitch Manager not found' });

    const isMatch = await pitchManager.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: pitchManager._id, role: 'pitchmanager' },
      'your_secret_key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      pitchManager: { name: pitchManager.name, email: pitchManager.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
