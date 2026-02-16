import mongoose from 'mongoose';

const demoRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);
export default DemoRequest;
