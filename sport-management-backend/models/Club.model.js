// models/Club.js
import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  club_id: {
    type: String,
    unique: true,
    required: true,
  },
  club_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager', // Reference to the Manager schema
    // unique: true,
    // required: false, 
    // sparse: true,
    default: null
  },
  location:{
    type: String,
   required: true,
  },
  establish_date: {
    type: Date,
   required: true,
  },
  contact_email: {
    type: String,
   required: true,
  },
  phone_number: {
    type: String,
   required: true,
  },
  logo_image: String,
  description: String,
});

export default mongoose.model('Club', clubSchema);
