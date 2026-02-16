import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const nutritionistSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  club_id: String,
});

nutritionistSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

nutritionistSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Nutritionist = mongoose.model('Nutritionist', nutritionistSchema);
export default Nutritionist;
