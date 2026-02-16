


// // models/Player.model.js
// import mongoose from 'mongoose';

// /* --- Marketplace subdocument (no separate _id) --- */
// const MarketSchema = new mongoose.Schema(
//   {
//     sport: {
//       type: String,
//       enum: ['Football', 'Cricket', 'Hockey', 'Rugby', 'Other'],
//       required: true,
//     },
//     preferredPositions: [String], // e.g., ["ST","LW"] or ["Bowler"]
//     location: String,
//     askingPrice: Number, // optional; open to offers if omitted
//     currency: { type: String, default: 'INR' },
//     visibility: { type: String, enum: ['public', 'private'], default: 'public' },
//     bio: String,
//     highlightsVideoUrl: String,
//     achievements: [String],
//     footOrHand: { type: String, enum: ['Right', 'Left', 'Both'] },
//     verified: { type: Boolean, default: false }, // moderation hook
//     status: {
//       type: String,
//       enum: ['draft', 'pending', 'approved', 'rejected'],
//       default: 'approved', // flip to 'pending' if you want reviews
//     },
//   },
//   { _id: false }
// );

// /* --- Player schema --- */
// const playerSchema = new mongoose.Schema({
//   player_id: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   phone_number: String,
//   position: String,
//   height: Number,
//   weight: Number,

//   join_date: {
//     type: Date,
//     default: Date.now,
//   },

//   club_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Club',
//     default: null,
//   },

//   status: {
//     type: String,
//     enum: ['Active', 'Injured'],
//     default: 'Active',
//   },

//   // Marketplace toggle (used by existing controllers/UI)
//   isAvailableOnMarket: {
//     type: Boolean,
//     default: false,
//   },

//   // New: embedded marketplace listing
//   market: { type: MarketSchema, default: null },
// });

// /* Helpful compound indexes for marketplace queries */
// playerSchema.index({
//   isAvailableOnMarket: 1,
//   'market.sport': 1,
//   'market.location': 1,
// });

// /* Export */
// export default mongoose.model('Player', playerSchema);
















import mongoose from "mongoose";

/* --- Marketplace subdocument (no separate _id) --- */
const MarketSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      enum: ["Football", "Cricket", "Hockey", "Rugby", "Other"],
      required: true,
    },
    preferredPositions: [String], // e.g., ["ST","LW"] or ["Bowler"]
    location: String,
    askingPrice: Number, // optional; open to offers if omitted
    currency: { type: String, default: "INR" },
    visibility: { type: String, enum: ["public", "private"], default: "public" },
    bio: String,
    highlightsVideoUrl: String,
    achievements: [String],
    footOrHand: { type: String, enum: ["Right", "Left", "Both"] },
    verified: { type: Boolean, default: false }, // moderation hook
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "approved", // flip to 'pending' if you want reviews
    },
  },
  { _id: false }
);

/* --- Player schema --- */
const playerSchema = new mongoose.Schema(
  {
    player_id: {
      type: String,
      unique: true,
      required: true,
    },

    /* Auth / identity */
    name: String,
    email: { type: String, unique: true, sparse: true },
    password: String,
    phone_number: String,

    /* Sports basics */
    position: String,
    height: Number,
    weight: Number,

    /* Club linkage */
    club_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      default: null,
    },

    /* Status */
    status: {
      type: String,
      enum: ["Active", "Injured"],
      default: "Active",
    },

    join_date: {
      type: Date,
      default: Date.now,
    },

    /* Marketplace toggle (used by existing controllers/UI) */
    isAvailableOnMarket: {
      type: Boolean,
      default: false,
    },

    /* Embedded marketplace listing */
    market: { type: MarketSchema, default: null },

    /* ====== NEW: profile fields persisted for the Profile page ====== */
    about: { type: String, default: "" },
    location: { type: String, default: "" },
    website: { type: String, default: "" },
    pincode: { type: String, default: "" },

    club_history: { type: [String], default: [] }, // free-form list of lines

    stats: {
      goals: { type: Number, default: 0 },
      matches: { type: Number, default: 0 },
      red: { type: Number, default: 0 },
      yellow: { type: Number, default: 0 },
    },

    // optional human-readable club name shown on the profile header
    club_name: { type: String, default: "" },

    // media
    avatarUrl: { type: String, default: "" },
    bannerUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

/* Helpful compound indexes for marketplace queries */
playerSchema.index({
  isAvailableOnMarket: 1,
  "market.sport": 1,
  "market.location": 1,
});

/* Export */
export default mongoose.model("Player", playerSchema);

