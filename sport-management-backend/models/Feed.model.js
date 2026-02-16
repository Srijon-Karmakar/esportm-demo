// import mongoose from 'mongoose';

// const feedSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     refPath: 'userType',
//     required: true
//   },
//   userType: {
//     type: String,
//     enum: ['Player', 'Manager'],
//     required: true
//   },
//   caption: String,
//   mediaUrl: String, // photo or video
//   mediaType: { type: String, enum: ['image', 'video'], required: true },
//   reactions: [
//     {
//       user: { type: mongoose.Schema.Types.ObjectId, refPath: 'reactions.userType' },
//       userType: { type: String, enum: ['Player', 'Manager'] },
//       type: { type: String, enum: ['like', 'love', 'clap', 'fire'], default: 'like' }
//     }
//   ],
//   comments: [
//     {
//       user: { type: mongoose.Schema.Types.ObjectId, refPath: 'comments.userType' },
//       userType: { type: String, enum: ['Player', 'Manager'] },
//       text: String,
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Feed', feedSchema);




// models/Feed.model.js
import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'userType',
    required: true,
  },
  userType: {
    type: String,
    enum: ['Player', 'Manager'],
    required: true,
  },
  caption: String,
  mediaUrl: String,
  mediaType: { type: String, enum: ['image', 'video'], required: true },
  reactions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, refPath: 'reactions.userType' },
      userType: { type: String, enum: ['Player', 'Manager'] },
      type: { type: String, enum: ['like', 'love', 'clap', 'fire'], default: 'like' },
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, refPath: 'comments.userType' },
      userType: { type: String, enum: ['Player', 'Manager'] },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Feed', feedSchema);
