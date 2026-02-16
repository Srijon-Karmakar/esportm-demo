// models/Physio.model.js
import mongoose from 'mongoose';

const physioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'physio',
  },
}, {
  timestamps: true
});

export default mongoose.model('Physio', physioSchema);
