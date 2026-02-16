// dropIndex.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // 🧹 Drop the unique index on 'manager'
    await mongoose.connection.collection('clubs').dropIndex('manager_1');
    console.log('Dropped index: manager_1');

    process.exit(); // Exit script
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

connectDB();
