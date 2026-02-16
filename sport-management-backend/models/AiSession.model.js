import mongoose from 'mongoose';


const AiSessionSchema = new mongoose.Schema({
ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: false },
role: { type: String, enum: ['manager','coach','player','physio','admin','club'], default: 'manager' },
title: { type: String, default: 'New Chat' },
}, { timestamps: true });


export default mongoose.model('AiSession', AiSessionSchema);