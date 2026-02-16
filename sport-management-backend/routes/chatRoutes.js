import express from 'express';
import Chat from '../models/Chat.model.js';

const router = express.Router();

// Send a message
router.post('/send', async (req, res) => {
  try {
    const { chatRoomId, sender, receiver, message } = req.body;
    const newMessage = new Chat({ chatRoomId, sender, receiver, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages for a chat room
router.get('/:chatRoomId', async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await Chat.find({ chatRoomId }).populate('sender receiver');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;