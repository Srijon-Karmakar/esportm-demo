import Club from '../models/Club.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import Player from '../models/Player.model.js';




export const signupClub = async (req, res) => {
  try {
    console.log('Received signup data:', req.body);
    const { club_name, email, password, location, establish_date, phone_number, description, } = req.body;

    if (!club_name || !email || !password || !location || !establish_date || !phone_number) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Check if the email already exists
    const existingClub = await Club.findOne({ contact_email: email });
    if (existingClub) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new club
    const newClub = new Club({
      club_id: `CLUB-${Date.now()}`,
      club_name,
      contact_email: email,
      password: hashedPassword,
      location,
      establish_date: new Date(establish_date),
      phone_number,
      description,
    });

    await newClub.save();
    res.status(201).json({ message: 'Club registered successfully', club: newClub });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    console.error('Signup Error:', error); // ✅ Add this
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};






export const loginClub = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const club = await Club.findOne({ contact_email: email });
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

   
    const isPasswordValid = await bcrypt.compare(password, club.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: club._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token,
    club_id: club.club_id, // club_id 
    name: club.club_name,
  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// upd 25.7.25
export const getClubPlayers = async (req, res) => {
  try {
    const clubId = req.user._id;

    const players = await Player.find({ club_id: clubId });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// upd 26.7.25 
// Remove a player from a club
export const removeFromClub = async (req, res) => {
  try {
    const clubId = req.user._id; // From protectClub middleware
    const playerId = req.params.id;

    const player = await Player.findOne({ _id: playerId, club_id: clubId });

    if (!player) {
      return res.status(404).json({ message: 'Player not found in your club' });
    }

    player.club_id = null; // Remove the club association
    await player.save();

    res.status(200).json({ message: 'Player removed from club successfully' });
  } catch (error) {
    console.error('Remove Player Error:', error);
    res.status(500).json({ message: 'Server error while removing player' });
  }
};









// profile update 11.7.25 
// GET /api/club/me
export const getMeClub = async (req, res) => {
  const c = req.user; // from protectClub
  res.json({
    id: c._id,
    club_name: c.club_name,
    email: c.contact_email,
    phone_number: c.phone_number,
    location: c.location,
    establish_date: c.establish_date,
    description: c.description,
  });
};

// PUT /api/club/me
export const updateMeClub = async (req, res) => {
  const c = req.user;
  const {
    club_name,
    contact_email, // front may send as email; handle both
    email,
    phone_number,
    location,
    establish_date,
    description,
  } = req.body;

  if (club_name !== undefined) c.club_name = club_name;
  const finalEmail = contact_email ?? email;
  if (finalEmail !== undefined) c.contact_email = finalEmail;
  if (phone_number !== undefined) c.phone_number = phone_number;
  if (location !== undefined) c.location = location;
  if (establish_date !== undefined) c.establish_date = new Date(establish_date);
  if (description !== undefined) c.description = description;

  await c.save();
  res.json({ message: "Club profile updated" });
};

// profile update 11.7.25 
