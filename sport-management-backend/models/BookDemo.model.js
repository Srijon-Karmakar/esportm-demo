// models/BookDemo.model.js
import mongoose from "mongoose";

const BookDemoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    club: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "done", "cancelled"],
      default: "new",
    },
    meta: {
      ip: String,
      ua: String,
      referrer: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookDemo", BookDemoSchema);
