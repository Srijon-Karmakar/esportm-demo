import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const pitchManagerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  club_id: String,
});

pitchManagerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

pitchManagerSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const PitchManager = mongoose.model('PitchManager', pitchManagerSchema);
export default PitchManager;
