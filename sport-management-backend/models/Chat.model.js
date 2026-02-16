//whole file updated in 8/6/25
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chatRoomId: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Chat', chatSchema);