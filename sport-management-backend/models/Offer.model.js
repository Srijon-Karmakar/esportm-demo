import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    fromRole: {
      type: String,
      enum: ["manager", "coach"],
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "withdrawn"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Offer", OfferSchema);
