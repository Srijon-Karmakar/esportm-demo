// models/Performance.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  performance_id: {
    type: String,
    unique: true,
    required: true,
  },
  player_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    unique: true, // Ensures one-to-one relationship
    required: true,
  },
  rating: Number,
  goals: Number,
  assists: Number,
  matches: Number,
  // Add more performance metrics as needed
});

export default mongoose.model('Performance', performanceSchema);
