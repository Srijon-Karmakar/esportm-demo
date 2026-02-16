import Nutritionist from '../models/Nutritionist.model.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const nutritionist = new Nutritionist(req.body);
    await nutritionist.save();
    res.status(201).json({ message: 'Nutritionist registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const nutritionist = await Nutritionist.findOne({ email });
    if (!nutritionist) return res.status(404).json({ message: 'Nutritionist not found' });

    const isMatch = await nutritionist.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: nutritionist._id, role: 'nutritionist' },
      'your_secret_key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      nutritionist: { name: nutritionist.name, email: nutritionist.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
