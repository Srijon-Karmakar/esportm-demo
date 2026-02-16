import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomId: { type: String, index: true, required: true },
    sender: {
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
      role: { type: String, enum: ["Player", "Manager"], required: true },
    },
    text: { type: String, default: "" },
    attachments: [
      {
        url: String,
        kind: { type: String, enum: ["image", "video", "file"], default: "file" },
        name: String,
        size: Number,
        mime: String,
      },
    ],
    deliveredTo: [{ userId: mongoose.Schema.Types.ObjectId, at: Date }],
    readBy: [{ userId: mongoose.Schema.Types.ObjectId, at: Date }],
  },
  { timestamps: true }
);

messageSchema.index({ roomId: 1, createdAt: -1 });
export default mongoose.model("Message", messageSchema);
