import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const coachSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  club_id: String,
});

coachSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

coachSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Coach = mongoose.model('Coach', coachSchema);
export default Coach;
