import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  caption: { type: String, trim: true },
  mediaUrl: { type: String, required: true }, // Cloudinary URL
  mediaType: { type: String, enum: ["image", "video"], required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  comments: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
