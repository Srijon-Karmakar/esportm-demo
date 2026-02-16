import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userType: { type: String, enum: ["player", "manager", "coach"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: String,
    body: String,
    data: Object,
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
