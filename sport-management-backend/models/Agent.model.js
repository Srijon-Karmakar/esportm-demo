import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'agent' }
}, { timestamps: true });

const Agent = mongoose.model('Agent', AgentSchema);

// ✅ Export default
export default Agent;
