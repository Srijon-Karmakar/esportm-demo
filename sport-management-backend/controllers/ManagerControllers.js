import Manager from '../models/Manager.model.js';
import Club from '../models/Club.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signupManager = async (req, res) => {
  try {
    const { name, email, password, phone, club_id, } = req.body;
    const clubId = req.body.club_id?.trim();
    if (!club_id) return res.status(400).json({ message: 'Club ID is required' });

    


    // const authHeader = req.headers.authorization;
    // if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    // const token = authHeader.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const clubId = decoded.id;

    



    // Check if club_id exists
    const club = await Club.findOne({ club_id: clubId });
    if (!club) {
      return res.status(400).json({ message: 'Invalid club ID' });
    }

    // Check if email already exists
    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if club already has a manager
    const clubHasManager = await Manager.findOne({ club: club._id });
    if (clubHasManager) {
      return res.status(400).json({ message: 'This club already has a manager' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create manager
    const newManager = new Manager({
      name,
      email,
      password: hashedPassword,
      phone,
      club: club._id,
    });

    await newManager.save();
    res.status(201).json({ message: 'Manager registered successfully', manager: newManager });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;


    const manager = await Manager.findOne({ email }).populate('club');
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, manager.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: manager._id, role: 'Manager' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token,
      manager_name: manager.name, 
      club_id: manager.club?.club_id,
      club_name: manager.club?.club_name,
     });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};