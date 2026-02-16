// controllers/agent.controller.js

import Agent from '../models/Agent.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerAgent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({
      name,
      email,
      password: hashedPassword,
      role: 'agent'
    });

    await newAgent.save();

    const token = jwt.sign(
      { id: newAgent._id, role: 'agent' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Agent registered successfully',
      token,
      agent: {
        id: newAgent._id,
        name: newAgent.name,
        email: newAgent.email
      }
    });

  } catch (err) {
    console.error('Agent registration error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: agent._id, role: 'agent' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email
      }
    });

  } catch (err) {
    console.error('Agent login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
