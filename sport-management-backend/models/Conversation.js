import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    role: { type: String, enum: ["Player", "Manager"], required: true },
    lastReadAt: { type: Date, default: null },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    roomId: { type: String, unique: true, index: true },
    participants: {
      type: [participantSchema],
      validate: (v) => v.length === 2,
    },
    lastMessageAt: { type: Date, index: true },
    lastMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

conversationSchema.statics.buildRoomId = (a, b) => {
  const left = `${a.role}:${a.userId}`;
  const right = `${b.role}:${b.userId}`;
  return [left, right].sort().join("__"); // deterministic
};

export default mongoose.model("Conversation", conversationSchema);
