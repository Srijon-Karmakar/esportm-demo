import Physio from '../models/Physio.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerPhysio = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Physio.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Physio already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPhysio = new Physio({
      name,
      email,
      password: hashedPassword,
    });

    await newPhysio.save();

    const token = jwt.sign(
      { id: newPhysio._id, role: 'physio' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Physio registered successfully ✅',
      physio: {
        id: newPhysio._id,
        name: newPhysio.name,
        email: newPhysio.email,
        role: newPhysio.role
      },
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginPhysio = async (req, res) => {
  const { email, password } = req.body;

  try {
    const physio = await Physio.findOne({ email });
    if (!physio) return res.status(404).json({ message: 'Physio not found' });

    const isMatch = await bcrypt.compare(password, physio.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: physio._id, role: 'physio' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful ✅',
      physio: {
        id: physio._id,
        name: physio.name,
        email: physio.email,
        role: physio.role
      },
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
